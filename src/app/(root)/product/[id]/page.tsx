import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { Container, GroupVariants, PizzaImage, Title } from "@/components/shared";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return <Container className="flex flex-col my-10">
    <div className="flex flex-1">
      <PizzaImage imageUrl={product.imageUrl} size={40} />

      <div className="w-[490px] bg-[hsl(var(--muted))] rounded-[18px] p-7">
        <Title text={product.name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro at ducimus modi!</p>

        
        <GroupVariants 
        value="2"
        items={[
          {
          name: 'Маленька',
          value: '1',
          },
          {
          name: 'Середня',
          value: '2',
          },
          {
          name: 'Велика',
          value: '3',
          disabled: true,
          }
        ]} />
      </div>
    </div>
  </Container>
}
