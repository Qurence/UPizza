 "use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
  //   className?: string;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Ви успішно увійшли в аккаунт.", {icon: "✅"});
      onClose?.();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Не вдалося увійти в аккаунт.", {icon: "❌"});
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вхід в аккаунт" className="font-bold" size="md" />
            <p className="text-text-color">Введіть логін та пароль</p>
          </div>
        </div>
        <FormInput
          name="email"
          label="Електронна пошта"
          type="email"
          required
        />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};
