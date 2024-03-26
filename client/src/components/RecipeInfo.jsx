import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

function RecipeInfo({ recipe }) {
  const context = useContext(UserContext);
  const user = context.user;

  const navigate = useNavigate();

  console.log(recipe);

  const handleClick = () => {
    console.log(recipe.id);
    console.log(user.id);
    const newUserRecipe = {
      user_id: user.id,
      recipe_id: recipe.id,
    };
    fetch("http://127.0.0.1:5555/user_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserRecipe),
    }).then((r) => {
      if (r.ok) {
        r.json().then(navigate("/profile"));
      }
    });
  };

  return (
    <div>
      RecipeInfo
      <h1>{recipe.title}</h1>
      <p>{recipe.category}</p>
      <img src={recipe.recipe_image} alt={recipe.category} />
      <h2>{recipe.ingredients}</h2>
      <button onClick={handleClick}>Add to Collection</button>
    </div>
  );
}

export default RecipeInfo;
