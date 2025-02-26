import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

const DELIVERY_PRICE = 70;

interface Props {
  totalAmount: number;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  className,
}) => {
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Разом:</span>
        <span className="text-[34px] font-extrabold">
          {totalAmount + DELIVERY_PRICE} ₴
        </span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2" />
            Вартість кошику
          </div>
        }
        value={`${totalAmount}`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2" />
            Доставка
          </div>
        }
        value={`${DELIVERY_PRICE}`}
      />

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
