import { useContext, useEffect, useState } from "react";
import { RecipeIngredientContext } from "../context/RecipeIngredientContext.jsx";
import RecipeList from "./RecipeList.jsx";
import RecipeDetail from "./RecipeDetail.jsx";
import RecipeForm from "./RecipeForm.jsx";
import { Header, Container } from "semantic-ui-react";

function MainContent() {
  const context = useContext(RecipeIngredientContext);
  const recipeIngredients = context.recipeIngredients;
  const setRecipeIngredients = (recipe_ingredients) => {
    context.setRecipeIngredients([...recipe_ingredients], recipe_ingredients);
  };

  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "Recipe Title",
    category: "Category",
    recipe_image: "https://www.happycow.net/img/recipe-cutlery.jpg",
    instructions: "Instructions",
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch("http://127.0.0.1:5555/recipe_ingredients").then((r) => {
      if (r.ok) {
        r.json().then((data) => setRecipeIngredients(data));
      } else {
        setRecipeIngredients([]);
      }
    });
  };

  const changeSelectedRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <Header dividing as="h1">
        Recipe Detail
      </Header>
      <Container>
        <RecipeDetail selectedRecipe={selectedRecipe} />
      </Container>
      <Header dividing as="h2">
        Recipez
      </Header>
      <div style={{ display: "flex" }}>
        <RecipeList
          onRecipeSelection={changeSelectedRecipe}
          recipeIngredients={recipeIngredients}
        />
        <RecipeForm />
      </div>
    </div>
  );
}

export default MainContent;
