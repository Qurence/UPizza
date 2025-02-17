/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Image from "next/image";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { useCartStore } from "../../../store/";
import { PizzaSize, PizzaType } from "../../../constants/pizza";
import { Title } from "./title";
import { cn } from "@/lib/utils";
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
  const items = useCartStore((state) => state.items);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  React.useEffect(() => {
    fetchCartItems();
  }, []); //, [fetchCartItems] -- FIX Infinity Request

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[hsl(var(--muted))]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {(totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                У кошику{" "}
                <span className="font-bold">
                  {totalQuantity} {totalQuantity === 1 ? "товар" : "товари"}
                </span>
              </SheetTitle>
            </SheetHeader>
          )) || (
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Кошик порожній"
                className="text-center font-bolt my-2"
              />
              <SheetClose asChild>
                <Button className="w-60 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Повернутись назад
                </Button>
              </SheetClose>
            </div>
          )}

          {/* Items! */}
          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    className={"mb-2"}
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
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemoveButton={() => removeCartItem(item.id)}
                  />
                ))}
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
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
