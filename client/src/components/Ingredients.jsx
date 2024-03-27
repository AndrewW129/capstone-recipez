import { useEffect, useContext } from "react";
import { IngredientContext } from "../context/IngredientContext.jsx";
import { Container } from "semantic-ui-react";
import IngredientList from "./IngredientList.jsx";
import IngredientForm from "./IngredientForm.jsx";

function Ingredients() {
  const context = useContext(IngredientContext);
  const { ingredients, setIngredients } = context;

  const fetchIngredients = () => {
    fetch("http://127.0.0.1:5555/ingredients").then((r) => {
      if (r.ok) {
        r.json().then((ingredients) => {
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
      <Container>
        <IngredientForm />
      </Container>
      <IngredientList />
    </div>
  );
}

export default Ingredients;
