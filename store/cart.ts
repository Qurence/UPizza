/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "@/lib";

/* eslint-disable @typescript-eslint/no-explicit-any */


export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара в корзине */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  /* Запрос на добавление товара в корзину  CreateCartItemValues*/
  // !!!!!!!!!!!!!!!!!!!TODO: Типизировать values
  addCartItem: (values: any) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {},
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
}));
