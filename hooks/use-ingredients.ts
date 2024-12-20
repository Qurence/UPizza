import React from "react";
import { Ingredient } from '@prisma/client';
import { Api } from '../services/api-client';


export const useIngredients = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients); 
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, [])

    return {
        ingredients,
        loading,
      };
}