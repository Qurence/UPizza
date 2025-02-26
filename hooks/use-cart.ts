/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from "@/lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  //! Баг The result of getServerSnapshot should be cached to avoid an infinite loop
  // const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
  //   state.totalAmount,
  //   state.fetchCartItems,
  //   state.items
  // ]);
  // //! Исправлено, значения по отдельности, проблема в getSnapshot
  // const totalAmount = useCartStore((state) => state.totalAmount);
  // const items = useCartStore((state) => state.items);
  // const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  // const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  // const removeCartItem = useCartStore((state) => state.removeCartItem);  
  // const loading = useCartStore((state) => state.loading);  
  // const addCartItem = useCartStore((state) => state.addCartItem);  

  const cartState = useCartStore((state) => state);
  
  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []); //, [fetchCartItems] -- FIX Infinity Request

  return cartState
};
