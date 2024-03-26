import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function RecipeForm() {
  const navigate = useNavigate();

  const handleReset = () => {
    formik.resetForm();
  };

  const updateDisplay = (data) => {
    const recipeID = data.id;
    const newDisplayRecipe = {
      recipe_id: recipeID,
      ingredient_id: 3,
    };
    fetch("http://127.0.0.1:5555/recipe_ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDisplayRecipe),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          navigate("/");
        });
      } else {
        console.log("Failed to create display recipe");
      }
    });
  };

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.string().required("category is required"),
    instructions: yup.string().required("Please enter instructions"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      recipe_image: "",
      instructions: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch("http://127.0.0.1:5555/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
            updateDisplay(data);
            handleReset();
          });
        } else {
          console.log("Failed to post recipe");
          handleReset();
          navigate("/");
        }
      });
    },
  });
  return (
    <div className="component-container">
      <div className="form-container">
        <h2>Add A Recipe!</h2>
        {formik.errors &&
          Object.values(formik.errors).map((error, index) => (
            <p className="error-message" key={index}>
              {" "}
              {error}
            </p>
          ))}
        <form className="form" onSubmit={formik.handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            placeholder="Title..."
            onChange={formik.handleChange}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formik.values.category}
            placeholder="Category..."
            onChange={formik.handleChange}
          />
          <label>Recipe Picture:</label>
          <input
            type="text"
            name="recipe_image"
            value={formik.values.recipe_image}
            placeholder="Recipe Picture..."
            onChange={formik.handleChange}
          />
          <label>Instructions:</label>
          <input
            type="text"
            name="instructions"
            value={formik.values.instructions}
            placeholder="Instructions..."
            onChange={formik.handleChange}
          />
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
