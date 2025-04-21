import React from "react";
import { FormInput, WhiteBlock } from "..";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock className={cn("p-6", className)} title="2. Особисті дані">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Ім'я" />
        <FormInput name="lastName" className="text-base" placeholder="Прізвище" />
        <FormInput name="email" className="text-base" placeholder="Емейл" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
