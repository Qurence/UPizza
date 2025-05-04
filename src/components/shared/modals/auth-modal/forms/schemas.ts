import {z} from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Пароль має містити не менше 4 символів' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введіть коректну електронну пошту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
z.object({
    fullName: z.string().min(2, { message: 'Введіть ваше ім\'я та прізвище' }),
    confirmPassword: passwordSchema,
})
).refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;