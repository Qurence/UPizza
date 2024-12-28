/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { ChooseProductModal, Container, GroupVariants, PizzaImage, Title } from "@/components/shared";
import { prisma } from "../../../../../../prisma/prisma-client";

export default async function ProductModalPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    }
  });

  if (!product) return notFound();
  return <ChooseProductModal product={product} />;
}
