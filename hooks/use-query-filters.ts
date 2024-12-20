import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const [prevQuery, setPrevQuery] = React.useState("");

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    // Проверка на изменение запроса
    if (prevQuery !== query) {
      router.push(`?${query}`, {
        scroll: false,
      });
      setPrevQuery(query);  // Обновление предыдущего запроса
    }
  }, [filters, router, prevQuery]);
};
