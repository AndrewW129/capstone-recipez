function UserRecipes({ recipe }) {
  // console.log(recipe);
  if (recipe === undefined) {
    <div>Undefined</div>;
  } else {
    return (
      <div>
        <h1>{recipe.recipes.title}</h1>
        <p>{recipe.recipes.category}</p>
        <img src={recipe.recipes.recipe_image} alt={recipe.recipes.category} />
      </div>
    );
  }
  return <div>Recipe Item</div>;
}

export default UserRecipes;
