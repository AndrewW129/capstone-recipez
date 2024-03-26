function IngredientItem({ ingredient }) {
  // console.log(ingredient);
  const ingredientRecipes = ingredient.recipes.map((recipe) => {
    return recipe;
  });

  ingredient.recipes.map((recipe) => {
    return recipe.recipes.title;
  });

  return (
    <div className="ingredient-container">
      <h3 className="i-name">{ingredient.name}</h3>
      <img
        className="image"
        src={ingredient.ingredient_image}
        alt={ingredient.name}
      />
      <p className="i-type">{ingredient.ingredient_type}</p>
      {ingredientRecipes.map((recipe) => {
        return (
          <ul className="i-type" key={recipe.id}>
            {recipe.recipes.title}
          </ul>
        );
      })}
    </div>
  );
}

export default IngredientItem;
