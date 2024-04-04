import { Card, CardContent, Header, Image, Button } from "semantic-ui-react";

function UserRecipes({ recipe }) {
  const mappedIngredients = recipe.recipes.ingredients.map((ingredient) => {
    if (ingredient.ingredients.name !== undefined)
      return <p key={recipe.id}>{ingredient.ingredients.name}</p>;
  });

  const handleClick = () => {
    console.log(recipe);
    fetch(`http://127.0.0.1:5555/user_recipes/${recipe.id}`, {
      method: "DELETE",
    });
  };
  if (recipe === undefined) {
    <div>Undefined</div>;
  } else {
    return (
      <Card raised>
        <CardContent>
          <Header as="h2">{recipe.recipes.title}</Header>
          <p>{recipe.recipes.category}</p>
          <Image
            rounded
            bordered
            src={recipe.recipes.recipe_image}
            alt={recipe.recipes.category}
          />
          <Header as="h4">Ingredients:</Header>
          <p>{mappedIngredients}</p>
          <Header as="h4">Instructions:</Header>
          <p>{recipe.recipes.instructions}</p>
          <Button basic color="red" onClick={handleClick}>
            Remove from collection
          </Button>
        </CardContent>
      </Card>
    );
  }
  return <div>Recipe Item</div>;
}
export default UserRecipes;
