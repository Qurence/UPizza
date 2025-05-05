"use server";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChecoutFormValues } from "../../constants";
import { prisma } from "../../prisma/prisma-client";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib";
import { PayOrderTemplate } from "@/components/shared";
import { getPaymentUrl } from "@/lib/wayforpay";
import { createPaymentRequest } from "@/lib/wayforpay";
import { getUserSession } from "@/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUserTemplate } from "@/components/shared/email-temapltes/verification-user";

export async function createOrder(data: ChecoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) {
      throw new Error(
        "Не знайдено токен кошика. Будь ласка, спробуйте ще раз."
      );
    }

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

    if (!userCart) {
      throw new Error("Кошик не знайдено. Будь ласка, спробуйте ще раз.");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Кошик порожній. Додайте товари до кошика.");
    }

    const order = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
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
        },
      });

      await tx.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          totalAmount: 0,
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      return order;
    });

    // Генерируем уникальный orderReference для WayForPay
    const orderReference = `${order.id}_${Date.now()}`;

    const paymentRequest = createPaymentRequest({
      orderId: orderReference, // используем уникальный orderReference
      amount: order.totalAmount,
      clientFirstName: data.firstName,
      clientLastName: data.lastName,
      clientEmail: data.email,
      clientPhone: data.phone,
      clientAddress: data.address,
    });

    console.log(
      "Payment URL:",
      getPaymentUrl({
        orderId: orderReference, // тоже уникальный orderReference
        amount: order.totalAmount,
        clientFirstName: data.firstName,
        clientLastName: data.lastName,
        clientEmail: data.email,
        clientPhone: data.phone,
        clientAddress: data.address,
      })
    );

    try {
      await sendEmail(
        data.email,
        "UPizza | Замовлення №" + order.id,
        PayOrderTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          paymentUrl: getPaymentUrl({
            orderId: orderReference, // тоже уникальный orderReference
            amount: order.totalAmount,
            clientFirstName: data.firstName,
            clientLastName: data.lastName,
            clientEmail: data.email,
            clientPhone: data.phone,
            clientAddress: data.address,
          }),
        })
      );
    } catch (emailError) {
      console.error("[Send email] Error:", emailError);
    }

    return { success: true, paymentData: paymentRequest };
  } catch (error) {
    console.error("[Create order] Server action error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "Сталася невідома помилка. Будь ласка, спробуйте ще раз.",
    };
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error(
        "Не знайдено сесію користувача. Будь ласка, спробуйте ще раз."
      );
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[Update user] Server action error:", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error(
          "Пошта не підтверджена. Перевірте свою електронну пошту."
        );
      }
      throw new Error("Користувач з таким E-Mail вже існує.");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password as string, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "UPizza | 📝 Підтвердження реєстрації",
      VerificationUserTemplate({
        code: code,
      })
    );
  } catch (error) {
    console.log("[Register user] Server action error:", error);
    throw error;
  }
}
