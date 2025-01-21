import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../../constants/pizza";
/**
 * Функция для расчета общей стоимости пиццы
 * 
 * @example 
 * ```
 * calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)
 * ```
 * @param type - Тип выбранной пиццы
 * @param size - Размер выбранной пиццы
 * @param items - Список вариаций пицц
 * @param ingredients - Список ингредиентов
 * @param selectedIngredients - Список выбранных ингредиентов
 * @returns  Общая стоимость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  // TODO Обработать не существующие позиции +
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size) ?.price || 0;
  const totalIngredientsPrice = ingredients .filter((ingredient) => selectedIngredients.has(ingredient.id)) .reduce((total, ingredient) => total + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
