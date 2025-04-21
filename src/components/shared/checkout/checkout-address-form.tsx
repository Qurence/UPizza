/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FormInput, WhiteBlock } from "..";
import { Input, Textarea } from "@/components/ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className="p-6" title="3. Адреса доставки">
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Введіть адресу..."
        />
        <Textarea
          className="text-base"
          placeholder="Коментар до заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
