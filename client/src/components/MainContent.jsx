import { useContext, useEffect, useState } from "react";
import { RecipeIngredientContext } from "../context/RecipeIngredientContext.jsx";
import RecipeList from "./RecipeList.jsx";
import RecipeDetail from "./RecipeDetail.jsx";
import RecipeForm from "./RecipeForm.jsx";

function MainContent() {
  const context = useContext(RecipeIngredientContext);
  const recipeIngredients = context.recipeIngredients;
  const setRecipeIngredients = (recipe_ingredients) => {
    context.setRecipeIngredients([...recipe_ingredients], recipe_ingredients);
  };

  const [selectedRecipe, setSelectedRecipe] = useState({});

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

  // const setRecipeIngredients = (recipe_ingredients) =>
  //   context.setRecipeIngredients([...recipe_ingredients], recipe_ingredients);

  const changeSelectedRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };
  //   function addRecipe(recipe) {
  //     console.log(recipe);
  //   }

  return (
    <div>
      MainContent
      <RecipeList
        onRecipeSelection={changeSelectedRecipe}
        recipeIngredients={recipeIngredients}
      />
      <RecipeDetail selectedRecipe={selectedRecipe} />
      <RecipeForm />
    </div>
  );
}

export default MainContent;
