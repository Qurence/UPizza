 
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
    // const textDetaills = '30 см, традиційне тісто 30';
    // const totalPrice = 120;
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-muted p-7 rounded-r-[18px]">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        {/* <p className="text-gray-400">{textDetaills}</p> */}

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-white rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};

