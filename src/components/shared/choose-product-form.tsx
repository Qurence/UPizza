/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора продукта
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn(className, "flex flex-col md:flex-row flex-1 overflow-hidden")}>
      <div className="flex items-center justify-center p-4 md:p-0 md:flex-1 relative w-full bg-[hsl(var(--popover))]">
        <img
          src={imageUrl}
          alt={name}
          className="relative md:left-2 md:top-2 transition-all z-10 duration-300 w-[200px] h-[200px] md:w-[350px] md:h-[350px]"
        />
      </div>

      <div className="w-full md:w-[490px] bg-muted p-4 md:p-7 rounded-b-[18px] md:rounded-b-none md:rounded-r-[18px]">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-white rounded-[18px] w-full mt-5 md:mt-10"
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};

