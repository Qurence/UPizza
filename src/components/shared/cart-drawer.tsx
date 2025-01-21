/* eslint-disable @typescript-eslint/no-unused-vars */
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
