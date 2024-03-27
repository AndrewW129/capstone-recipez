import RecipeCard from "./RecipeCard";
import { CardGroup } from "semantic-ui-react";

function RecipeList({ recipeIngredients, onRecipeSelection }) {
  return (
    <div style={{ width: "50%" }}>
      <CardGroup itemsPerRow={3}>
        {recipeIngredients.map((recipeIngredient) => (
          <RecipeCard
            key={recipeIngredient.id}
            recipeIngredient={recipeIngredient}
            onRecipeSelection={onRecipeSelection}
          />
        ))}
      </CardGroup>
    </div>
  );
}

export default RecipeList;
