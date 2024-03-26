function RecipeCard({ recipeIngredient, onRecipeSelection }) {
  const recipe = recipeIngredient.recipes;

  const handleClick = () => {
    onRecipeSelection(recipe);
  };

  return (
    <div>
      <div className="recipe">
        <h2>{recipe.title}</h2>
        <img src={recipe.recipe_image} alt={recipe.category} />
        <button value={recipe} onClick={handleClick}>
          View Recipe
        </button>
      </div>
    </div>
  );
}
// need the join table recipes... whoops
export default RecipeCard;
