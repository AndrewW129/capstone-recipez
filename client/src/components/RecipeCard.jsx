import {
  Image,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipeIngredient, onRecipeSelection }) {
  const recipe = recipeIngredient.recipes;

  const navigate = useNavigate();

  const handleClick = () => {
    onRecipeSelection(recipe);
    navigate("/");
  };

  return (
    <Card raised>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardHeader textAlign="center">{recipe.title}</CardHeader>
        <Image
          style={{ height: "150px", width: "auto" }}
          bordered
          rounded
          size="medium"
          src={recipe.recipe_image}
        />
        <Button
          style={{ marginTop: "5px" }}
          value={recipe}
          onClick={handleClick}
        >
          View Full Recipe
        </Button>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
