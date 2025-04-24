 
import React from "react";
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from "..";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const [address] = React.useState("");
  const { control } = useFormContext();
  return (
    <WhiteBlock className={cn("p-6", className)} title="3. Адреса доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput
                name="address"
                placeholder="Введіть адресу..."
                value={address}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Коментар до заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
