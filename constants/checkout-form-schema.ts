import {z} from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { message: "Ім'я має містити не менше 2 символів" }),
    lastName: z.string().min(2, { message: "Прізвище має містити не менше 2 символів" }),
    email: z.string().email({ message: "Некоректна електронна адреса" }),
    phone: z.string().min(10, { message: "Некоректний номер телефону" }),
    address: z.string().min(5, { message: "Адреса має містити не менше 5 символів" }),
    comment: z.string().optional(),
});

export type ChecoutFormValues = z.infer<typeof checkoutFormSchema>;