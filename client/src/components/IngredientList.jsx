import { useContext } from "react";
import IngredientItem from "./IngredientItem";
import { IngredientContext } from "../context/IngredientContext.jsx";

function IngredientList() {
  const context = useContext(IngredientContext);
  const ingredients = context.ingredients;
  // console.log(ingredients);
  return (
    <div>
      Ingredients
      <div>
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

export default IngredientList;
