/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import React from 'react';
import { Title } from '../title';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <div className={className}>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hideden",
            className
          )}>
          <VisuallyHidden>
            <DialogTitle>Dialog Title</DialogTitle>
          </VisuallyHidden>

          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

