 
'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ProductWithRelations } from '../../../../@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <div className={className}>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hideden",
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
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

