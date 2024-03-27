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
    title: "Basic Spaghetti",
    category: "Pasta",
    recipe_image:
      "https://images.stockcake.com/public/9/2/4/9244f8e7-e87b-430d-baa8-e3da0743953a_large/savory-pasta-dinner-stockcake.jpg",
    instructions:
      "Fill a large pot with water, add a generous amount of salt, and bring it to a rolling boil over high heat. Once the water is boiling, add the spaghetti noodles to the pot. Use a long-handled spoon to stir the noodles gently to prevent sticking. Cook the spaghetti according to the package instructions, usually around 8 to 10 minutes, or until al dente, which means the pasta is cooked but still firm to the bite. While the spaghetti is cooking, you can prepare the sauce of your choice. A simple marinara sauce can be made by heating olive oil in a separate pan, adding minced garlic, and cooking until fragrant. Then, add canned crushed tomatoes, dried Italian herbs (such as basil and oregano), salt, and pepper. Simmer the sauce for about 10-15 minutes until it thickens slightly. Once the spaghetti is cooked, use tongs or a pasta fork to transfer the noodles directly from the pot to the pan with the sauce. Alternatively, you can drain the spaghetti in a colander in the sink and then add it to the sauce. Toss the spaghetti with the sauce until it's well coated. Cook for an additional minute or two over low heat to allow the flavors to meld together. Serve the spaghetti hot, garnished with freshly grated Parmesan cheese and chopped parsley if desired. Enjoy your simple and delicious spaghetti!",
    users: ["maya"],
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
      <Header
        style={{ marginTop: "30px", textAlign: "center" }}
        dividing
        as="h1"
      >
        Recipe Details
      </Header>
      <Container>
        <RecipeDetail selectedRecipe={selectedRecipe} />
      </Container>
      <Header
        style={{ marginBottom: "30px", textAlign: "center" }}
        dividing
        as="h2"
      >
        Recipez
      </Header>
      <div style={{ padding: "20px", display: "flex" }}>
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
