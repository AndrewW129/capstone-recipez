import { Card, CardContent, Header, Image } from "semantic-ui-react";

function UserRecipes({ recipe }) {
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
          <Header as="h4">Instructions:</Header>
          <p>{recipe.recipes.instructions}</p>
        </CardContent>
      </Card>
    );
  }
  return <div>Recipe Item</div>;
}

export default UserRecipes;
