import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CardGroup } from "semantic-ui-react";
import UserRecipes from "./UserRecipes";

function UserCollection() {
  const fetchUserRecipes = () => {
    fetch("http://127.0.0.1:5555/user_recipes").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateRecipes(data);
        });
      }
    });
  };
  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const [recipes, setRecipes] = useState([]);

  const context = useContext(UserContext);
  const user = context.user;

  const updateRecipes = (recipes) => {
    let filteredRecipes = recipes.filter((recipe) => {
      if (user.id === recipe.user_id) {
        return recipe;
      }
    });
    setRecipes(filteredRecipes);
  };

  return (
    <div
      style={{
        width: "50%",
      }}
    >
      <CardGroup itemsPerRow={2}>
        {recipes.map((recipe) => {
          return <UserRecipes key={recipe.id} recipe={recipe} />;
        })}
      </CardGroup>
    </div>
  );
}

export default UserCollection;
