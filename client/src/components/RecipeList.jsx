import RecipeCard from "./RecipeCard";

function RecipeList({ recipeIngredients, onRecipeSelection }) {
  // console.log(recipeIngredients);
  return (
    <div>
      {recipeIngredients.map((recipeIngredient) => (
        <RecipeCard
          key={recipeIngredient.id}
          recipeIngredient={recipeIngredient}
          onRecipeSelection={onRecipeSelection}
        />
      ))}
    </div>
  );
}

export default RecipeList;
