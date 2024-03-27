import { useContext } from "react";
import { IngredientContext } from "../context/IngredientContext.jsx";
import { CardGroup } from "semantic-ui-react";
import IngredientItem from "./IngredientItem";

function IngredientList() {
  const context = useContext(IngredientContext);
  const ingredients = context.ingredients;
  return (
    <CardGroup itemsPerRow={3}>
      {ingredients.map((ingredient) => (
        <IngredientItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </CardGroup>
  );
}

export default IngredientList;
