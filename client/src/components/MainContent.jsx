import { useState, useEffect } from "react";
import RecipeList from "./RecipeList.jsx";
import RecipeDetail from "./RecipeDetail.jsx";
import RecipeForm from "./RecipeForm.jsx"

function MainContent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch("http://127.0.0.1:5555/recipes").then((r) => {
      if (r.ok) {
        r.json().then((recipes) => setRecipes(recipes));
      } else {
        setRecipes([]);
      }
    });
  };

  //   function addRecipe(recipe) {
  //     console.log(recipe);
  //   }

  return (
    <div>
      MainContent
      <RecipeList />
      <RecipeDetail />
      <RecipeForm />
    </div>
  );
}

export default MainContent;
