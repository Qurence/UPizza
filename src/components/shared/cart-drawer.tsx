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
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[hsl(var(--muted))]">
        <SheetHeader>
          <SheetTitle>
            У кошику <span className="font-bold">3 товари</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
                id={1}
                imageUrl={
                "http://26.26.250.12:3000/img/pizza/%D0%A7%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%20%D1%84%D1%80%D0%B5%D1%88.webp"
                }
                details={getCartItemDetails(2, 30, [
                { name: "Помідори" },
                { name: "Сир" },
                ])}
                name={"Чоризо фреш"}
                price={124}
                quantity={1}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-[hsl(var(--popover))] p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg">
                Разом
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">200 ₴</span>
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
