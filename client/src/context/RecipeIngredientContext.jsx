import { createContext, useState } from "react";

export const RecipeIngredientContext = createContext();

function RecipeIngredientProvider({ children }) {
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  return (
    <RecipeIngredientContext.Provider value={{ recipeIngredients, setRecipeIngredients }}>
      {children}
    </RecipeIngredientContext.Provider>
  );
}

export default RecipeIngredientProvider;
