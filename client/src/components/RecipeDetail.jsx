import RecipeInfo from "./RecipeInfo";

function RecipeDetail({ selectedRecipe }) {
  console.log(selectedRecipe);
  return (
    <div>
      <RecipeInfo recipe={selectedRecipe} />
    </div>
  );
}

export default RecipeDetail;
