"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/components/shared";
import { useCart } from "../../../../hooks";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalInfo, } from "@/components";
import { checkoutFormSchema, ChecoutFormValues } from "@/../constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
// import { loadGetInitialProps } from "next/dist/shared/lib/utils";


export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
  const form = useForm<ChecoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: ChecoutFormValues) => {
    console.log(data);
    createOrder(data);
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформлення замовлення"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                items={items}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonalInfo className={loading ? 'opacity-40 pointer-events-none' : ''}/>
              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>

            {/* Right side */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
