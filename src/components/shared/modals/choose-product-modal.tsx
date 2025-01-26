'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ProductWithRelations } from '../../../../@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '../../../../store';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

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

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(`${product.name} додано до кошику`);
      router.back();
    } catch (error) {
      toast.error(`Не вдалося додати ${product.name} до кошику`);
      console.error(error);
      
    }
  }

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

          {isPizzaForm ? (
            <ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
              onSubmit={onSubmit}
              loading={loading}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              onSubmit={onSubmit}
              price={firstItem.price}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

