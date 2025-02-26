"use client";

import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/components/shared";
import {Input, Textarea } from "@/components/ui";
import { useCart } from "../../../../hooks";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "../../../../constants/pizza";


export default function CheckoutLayout() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

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

      <div className="flex gap-10">
        {/* Left side */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock className="p-6" title="1. Кошик">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemoveButton={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock className="p-6" title="2. Особисті дані">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firtsName"
                className="text-base"
                placeholder="Ім'я"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Прізвище"
              />
              <Input name="email" className="text-base" placeholder="Емейл" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock className="p-6" title="3. Адреса доставки">
            <div className="flex flex-col gap-5">
              <Input
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
        </div>

        {/* Right side */}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
