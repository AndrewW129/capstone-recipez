import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import { Header, Button } from "semantic-ui-react";

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
    <div style={{ textAlign: "center" }}>
      <Header as="h2">{recipe.title}</Header>
      <p>{recipe.category}</p>
      <img
        style={{
          width: "500px",
          height: "auto",
        }}
        src={recipe.recipe_image}
        alt={recipe.category}
      />
      <Header as="h4">Instructions:</Header>
      <p>{recipe.instructions}</p>
      <Button color="green" onClick={handleClick}>
        Add to Collection
      </Button>
    </div>
  );
}

export default RecipeInfo;
