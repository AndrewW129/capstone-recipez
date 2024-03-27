import {
  Image,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "semantic-ui-react";

function RecipeCard({ recipeIngredient, onRecipeSelection }) {
  const recipe = recipeIngredient.recipes;

  const handleClick = () => {
    onRecipeSelection(recipe);
  };

  return (
    <Card raised>
      <CardContent>
        <CardHeader textAlign="center">{recipe.title}</CardHeader>
        <Image
          floated="left"
          bordered
          rounded
          size="medium"
          src={recipe.recipe_image}
        />
        <Button floated="right" value={recipe} onClick={handleClick}>
          View Full Recipe
        </Button>
      </CardContent>
    </Card>
  );
}
// need the join table recipes... whoops
export default RecipeCard;
