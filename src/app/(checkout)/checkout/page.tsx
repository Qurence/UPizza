import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from "@/components/shared";
import { Button, Input, Textarea } from "@/components/ui";
import { ArrowRight, Package, Truck } from "lucide-react";

export default function CheckoutLayout() {
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
              <CheckoutItem id={1} imageUrl={"/img/products/Сендвіч з шинкою і сиром.webp"} details={"lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"} name={"Сендвіч з шинкою і сиром"} price={200} quantity={2} />
              <CheckoutItem id={1} imageUrl={"/img/products/Сендвіч з шинкою і сиром.webp"} details={"lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"} name={"Сендвіч з шинкою і сиром"} price={100} quantity={1} />
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
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Разом:</span>
              <span className="text-[34px] font-extrabold">1200 ₴</span>
            </div>
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2" />
                  Вартість товарів
                </div>
              }
              value="1000"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2" />
                  Доставка
                </div>
              }
              value="70"
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти до оплати
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
