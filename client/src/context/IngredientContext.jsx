import { createContext, useState } from "react";

export const IngredientContext = createContext();

function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);

  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientContext.Provider>
  );
}

export default IngredientProvider;
