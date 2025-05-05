"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ProductForm } from "../product-form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  if (!product) {
    return null;
  }

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
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent 
        className={cn(
          "p-0 w-[92%] max-h-[80vh] sm:max-h-[85vh] sm:w-[85vw] md:w-[1060px] max-w-[1060px] bg-[hsl(var(--popover))] overflow-auto",
          className
        )}
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
