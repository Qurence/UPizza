import { cn } from "@/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes, } from "../../../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDetails } from "@/lib";
import { usePizzaOptions } from "../../../hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора пиццы
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient} = usePizzaOptions(items)
  const {textDetaills, totalPrice} = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "bg-[hsl(var(--popover))] rounded-[18px] flex flex-col md:flex-row flex-1 overflow-hidden")}>
      <div className="p-4 md:p-0 flex justify-center items-center md:flex-1 bg-[hsl(var(--popover))]">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="w-full md:w-[490px] bg-[hsl(var(--muted))] p-4 md:p-7 rounded-b-[18px] md:rounded-b-none md:rounded-r-[18px]">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-[hsl(var(--muted))] p-3 md:p-5 rounded-md h-[250px] md:h-[350px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-white rounded-[18px] w-full mt-5 md:mt-10"
        >
          Додати до кошику за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
