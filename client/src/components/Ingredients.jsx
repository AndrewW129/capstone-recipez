import { useEffect, useContext } from "react";
import { IngredientContext } from "../context/IngredientContext.jsx";
import IngredientList from "./IngredientList.jsx";
import IngredientForm from "./IngredientForm.jsx";

function Ingredients() {
  const context = useContext(IngredientContext);
  const { ingredients, setIngredients } = context;
  // console.log(ingredients);

  const fetchIngredients = () => {
    fetch("http://127.0.0.1:5555/ingredients").then((r) => {
      if (r.ok) {
        r.json().then((ingredients) => {
          // console.log(ingredients);
          setIngredients([...ingredients], ingredients);
        });
      } else {
        setIngredients([]);
      }
    });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      Ingredients
      <IngredientList />
      <IngredientForm />
    </div>
  );
}

export default Ingredients;
