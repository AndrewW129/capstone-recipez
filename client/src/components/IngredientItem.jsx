import { Card, CardContent, Header, Image } from "semantic-ui-react";

function IngredientItem({ ingredient }) {
  const ingredientRecipes = ingredient.recipes.map((recipe) => {
    return recipe;
  });

  ingredient.recipes.map((recipe) => {
    return recipe.recipes.title;
  });

  return (
    <Card raised>
      <CardContent>
        <Header as="h2">{ingredient.name}</Header>
        <p>{ingredient.ingredient_type}</p>
        <Image
          floated="left"
          bordered
          rounded
          src={ingredient.ingredient_image}
          alt={ingredient.name}
        />
        <Header as="h4">Included In:</Header>
        {ingredientRecipes.map((recipe) => {
          return (
            <ul className="i-type" key={recipe.id}>
              {recipe.recipes.title}
            </ul>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default IngredientItem;
