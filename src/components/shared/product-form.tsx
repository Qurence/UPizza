/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from "react";
import { useCartStore } from "../../../store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "../../../@types/prisma";
import { ChooseProductForm } from "./choose-product-form";
import { ChoosePizzaForm } from "./choose-pizza-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, className }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      if (isPizzaForm) {
        toast.success(`Піццу "${product.name}" додано до кошику`);
      } else {
        toast.success(`${product.name} додано до кошику`);
      }
    } catch (error) {
      toast.error(`Не вдалося додати ${product.name} до кошику`);
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  )
};
