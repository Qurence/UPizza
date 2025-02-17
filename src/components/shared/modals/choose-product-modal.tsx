"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  // const onAddProduct = () => {
  //   try {
  //     addCartItem({
  //       productItemId: firstItem.id,
  //     });
  //     toast.success(`${product.name} додано до кошику`);
  //     router.back();
  //   } catch (error) {
  //     toast.error('Не вдалося додати продукт до кошику');
  //     console.error(error);
  //   }
  // };

  // const onAddPizza = async (productItemId: number, ingredients: number[]) => {
  //   try {
  //     await addCartItem({
  //       productItemId,
  //       ingredients,
  //     });
  //     toast.success(`Піцу "${product.name}" додано до кошику`);
  //     router.back();
  //   } catch (error) {
  //     toast.error('Не вдалося додати піцу до кошику');
  //     console.error(error);
  //   }
  // };

  return (
    <div className={className}>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-0 w-[1060px] max-w-[1060px] min-h-[500px]  bg-[hsl(var(--popover))] overflow-hideden",
            className
          )}
        >
          <VisuallyHidden>
            <DialogTitle>Dialog Title</DialogTitle>
          </VisuallyHidden>

          <ProductForm product={product} onSubmit={router.back} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
