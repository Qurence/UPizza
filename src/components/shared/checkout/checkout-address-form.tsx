/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from "..";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const [address] = React.useState("");
  const { control } = useFormContext();
  return (
    <WhiteBlock className="p-6" title="3. Адреса доставки">
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
