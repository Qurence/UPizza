/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
  };

const generateProductItem = ({ 
    productId, 
    pizzaType, 
    size,
    }: { 
    productId: number;
    pizzaType: number; 
    size: number 
}) => {
    return {
      productId,
      price: randomDecimalNumber(190, 600),
      pizzaType,
      size,
    } as Prisma.ProductItemUncheckedCreateInput;
  };

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'John Doe',
                email: '9oXe0@example.com',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@example.com',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'ADMIN',
            }
        ]
    })

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.ingredient.createMany({
        data: ingredients,
    })

    await prisma.product.createMany({
        data: products,
    })

    const pizza1 = await prisma.product.create({
        data: {
          name: 'Пепперони фреш',
          imageUrl:
            'public/img/pizza/Пепперони фреш.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(0, 5),
          },
        },
      });

      const pizza2 = await prisma.product.create({
        data: {
          name: 'Сирна',
          imageUrl:
            'public/img/pizza/Сирна.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(5, 10),
          },
        },
      });
    
      const pizza3 = await prisma.product.create({
        data: {
          name: 'Чоризо фреш',
          imageUrl:
            'public/img/pizza/Чоризо фреш.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(10, 40),
          },
        },
      });

      await prisma.productItem.createMany({
          data: [
              {
                productId: pizza1.id,
                price: randomDecimalNumber(70, 340),
                pizzaType: 2,
                size: 30,
              },
              {
                productId: pizza1.id,
                price: randomDecimalNumber(70, 340),
                pizzaType: 2,
                size: 40,
              },
              {
                productId: pizza2.id,
                price: randomDecimalNumber(70, 340),
                pizzaType: 2,
                size: 20,
              }
          ]
      })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
}

async function main() {
    try{
        await down()
        await up()
    } catch (e) {
        console.error(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
    }) 
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })

