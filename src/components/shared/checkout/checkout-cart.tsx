import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "../../../../constants/pizza";
import { CartStateItem } from "@/lib/get-cart-details";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  className,
  loading,
}) => {
  return (
    <div className={className}>
      <WhiteBlock className="p-6" title="1. Кошик">
        <div className="flex flex-col gap-5">
          {loading &&
            [...Array(items.length > 0 ? items.length : 4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))}
          {!loading &&
            items.length > 0 &&
            items.map((item) => (
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
    </div>
  );
};
