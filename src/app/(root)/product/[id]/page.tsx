/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { ChooseProductForm, Container, GroupVariants, PizzaImage, ProductForm, Title } from "@/components/shared";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { useCartStore } from "../../../../../store";
import toast from "react-hot-toast";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const {
    id
  } = params;
  
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });



  if (!product) {
    return notFound();
  }
  

  return (
  <Container className="flex flex-col my-10">
    <ProductForm product={product} />
  </Container>
  )
}
