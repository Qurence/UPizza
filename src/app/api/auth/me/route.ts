import { getUserSession } from "@/lib/get-user-session";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json(
        { message: "Ви не авторизовані" },
        { status: 401 }
      );
    }

    const data = await prisma.user.findFirst({
      where: {
        id: Number(user.id),
      },
      select: {
          fullName: true,
          email: true,
          password: true,
      }
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
