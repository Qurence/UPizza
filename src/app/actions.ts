"use server";

import { OrderStatus } from "@prisma/client";
import { ChecoutFormValues } from "../../constants";
import { prisma } from "../../prisma/prisma-client";

export async function createOrder(data: ChecoutFormValues) {
  console.log(data);

  const token = "123";
  await prisma.order.create({
    data: {
      token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
    },
  });
}
