import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        // Автоматическая верификация без проверки кода
        return NextResponse.redirect(new URL('/?verified', req.url));
        
        // Старая логика (закомментирована)
        // const code = req.nextUrl.searchParams.get("code");

        // if (!code) {
        //     return NextResponse.json("Code is required", { status: 400 });
        // }

        // const verificationCode = await prisma.verificationCode.findFirst({
        //     where: {
        //         code,
        //     },
        // });

        // if (!verificationCode) {
        //     return NextResponse.json("Invalid code", { status: 400 });
        // }

        // await prisma.user.update({
        //     where: {
        //         id: verificationCode.userId,
        //     },
        //     data: {
        //         verified: new Date(),
        //     }
        // });

        // await prisma.verificationCode.delete({
        //     where: {
        //         id: verificationCode.id,
        //     },
        // });

        // return NextResponse.redirect(new URL('/?verified', req.url));
    } catch (error) {
        console.error("[Verify] Server action error:", error);
    }
}