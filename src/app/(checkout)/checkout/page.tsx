/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/components/shared";
import { useCart } from "../../../../hooks";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalInfo,
} from "@/components";
import {
  checkoutFormSchema,
  ChecoutFormValues,
} from "@/../constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "../../../../services/api-client";
// import { loadGetInitialProps } from "next/dist/shared/lib/utils";

function postToWayForPay(paymentData: Record<string, any>) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://secure.wayforpay.com/pay';

  Object.entries(paymentData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key + '[]';
        input.value = item;
        form.appendChild(input);
      });
    } else {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
}

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const { data: session } = useSession();  
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

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
      
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, []);

  const onSubmit = async (data: ChecoutFormValues) => {
    try {
      setSubmitting(true);
      const result = await createOrder(data);
      
      if (result.success && result.paymentData) {
      toast.success("Замовлення успішно створено! 📨 Перехід до оплати... ", {
        icon: "✅",
      });
        postToWayForPay(result.paymentData);
      } else {
        throw new Error(result.error || "Помилка створення замовлення");
      }
    } catch (error) {
      setSubmitting(false);
      toast.error(
        error instanceof Error ? error.message : "Помилка створення замовлення. Будь ласка, спробуйте пізніше.",
        {
          icon: "❌",
        }
      );
      console.error("Error creating order:", error);
    }
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
              <CheckoutPersonalInfo
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* Right side */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
