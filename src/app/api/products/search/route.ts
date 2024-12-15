import { prisma } from '../../../../../prisma/prisma-client';
import { NextRequest, NextResponse } from "next/server"
// import { prisma } from "../../../../../prisma/prisma-client"

export async function GET(reg: NextRequest) {
    const query = reg.nextUrl.searchParams.get('query') || "";
    
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
        take: 5,

    })

    return NextResponse.json(products)
}