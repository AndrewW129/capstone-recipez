import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Header, Button, Form, FormField, FormInput } from "semantic-ui-react";
import * as yup from "yup";

function RecipeForm() {
  const [form, setForm] = useState(false);

  const navigate = useNavigate();

  const handleReset = () => {
    formik.resetForm();
  };

  const handleClick = () => {
    setForm(!form);
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

  return !form ? (
    <div style={{ textAlign: "center", width: "50%" }}>
      <Button color="green" onClick={handleClick}>
        Add A Recipe!
      </Button>
    </div>
  ) : (
    <div
      style={{
        textAlign: "center",
        width: "50%",
      }}
    >
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "210px",
        }}
      >
        <Header as="h2">Add A Recipe!</Header>
        {formik.errors &&
          Object.values(formik.errors).map((error, index) => (
            <p className="error-message" key={index}>
              {" "}
              {error}
            </p>
          ))}
        <Form size="large" onSubmit={formik.handleSubmit}>
          <FormField>
            <FormInput
              label="Title:"
              type="text"
              name="title"
              value={formik.values.title}
              placeholder="Title..."
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <FormInput
              label="Category:"
              type="text"
              name="category"
              value={formik.values.category}
              placeholder="Category..."
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <FormInput
              label="Recipe Picture:"
              type="text"
              name="recipe_image"
              value={formik.values.recipe_image}
              placeholder="Recipe Picture..."
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <FormInput
              label="Instructions:"
              type="text"
              name="instructions"
              value={formik.values.instructions}
              placeholder="Instructions..."
              onChange={formik.handleChange}
            />
          </FormField>
          <Button color="green" type="submit">
            Add Recipe
          </Button>
        </Form>
      </div>
      <Button style={{ marginTop: "10px" }} color="black" onClick={handleClick}>
        Hide Form
      </Button>
    </div>
  );
}

export default RecipeForm;
