/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { get } from "http";
import { getCartItemDetails } from "@/lib";
import { useCartStore } from "../../../store/";
import { PizzaSize, PizzaType } from "../../../constants/pizza";
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  //! Баг The result of getServerSnapshot should be cached to avoid an infinite loop
  // const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
  //   state.totalAmount,
  //   state.fetchCartItems,
  //   state.items
  // ]);
  //! Исправлено, значения по отдельности, проблема в getSnapshot
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[hsl(var(--muted))]">
        <SheetHeader>
          <SheetTitle>
            У кошику <span className="font-bold">3 товари</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items! */}
        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ""
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-[hsl(var(--popover))] p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg">
                Разом
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₴</span>
            </div>
            <Link href="/cart">
              <Button
                type="submit"
                className="w-full h-12 text-white text-base"
              >
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
