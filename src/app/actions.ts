 
"use server";
import { OrderStatus } from "@prisma/client";
import { ChecoutFormValues } from "../../constants";
import { prisma } from "../../prisma/prisma-client";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib";
import { PayOrderTemplate } from "@/components/shared";

export async function createOrder(data: ChecoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found in cookies.");
    }

    // Находження кошика за токеном
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Якщо кошик не знайдено, викидаємо помилку
    if (!userCart) {
      throw new Error("Cart not found.");
    }

    // Якщо загальна сума кошика дорівнює 0, викидаємо помилку
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty.");
    }

    // Створення замовлення
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items), 
        // TODO: Перевірити UTF-8 в prisma, можливо прибрати кириллцю || пробелы
      },
    });

    // Якщо замовлення створено, очищаємо кошик
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Очищення товарів у кошику
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO: Посилати на платіжну систему
    
    sendEmail(
      data.email,
      "UPizza | Замовлення №" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "https://resend.com/docs/send-with-nextjs",
      })
    );
    
  } catch (error) {
    console.error("[Create order] Server action error:", error);
  }
}
