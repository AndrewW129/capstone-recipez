import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Header, Form, FormField, FormInput } from "semantic-ui-react";
import { IngredientContext } from "../context/IngredientContext.jsx";
import * as yup from "yup";

function IngredientForm() {
  const context = useContext(IngredientContext);
  const ingredients = context.ingredients;
  const setIngredients = (ingredients) =>
    context.setIngredients(...ingredients, [ingredients]);

  const [form, setForm] = useState(false);

  const navigate = useNavigate();

  const updateIngredient = (Ingredient) => {
    setIngredients(Ingredient);
  };

  const handleReset = () => {
    formik.resetForm();
  };

  const handleClick = () => {
    setForm(!form);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter a name for the ingredient."),
    ingredient_type: yup.string().required("Please enter an ingredient type."),
    ingredient_image: yup.string().required("Please enter an image."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      ingredient_type: "",
      ingredient_image: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5555/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
            updateIngredient(data);
            handleReset();
            navigate("/ingredients");
          });
        } else {
          updateIngredient(null);
          handleReset();
          navigate("/ingredients");
        }
      });
    },
  });
  return !form ? (
    <div
      style={{
        marginTop: "50px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <div>
        <Button color="green" onClick={handleClick}>
          Show Form
        </Button>
      </div>
    </div>
  ) : (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "285px",
        }}
      >
        <Header as="h2">Add An Ingredient!</Header>
        {formik.errors &&
          Object.values(formik.errors).map((error, index) => (
            <p className="error-message" key={index}>
              {" "}
              {error}
            </p>
          ))}
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <FormInput
              label="Name:"
              type="text"
              name="name"
              value={formik.values.name}
              placeholder="Ingredient Name..."
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <FormInput
              label="Type"
              type="text"
              name="ingredient_type"
              value={formik.values.ingredient_type}
              placeholder="Ingredient Type..."
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <FormInput
              label="Ingredient Image:"
              type="text"
              name="ingredient_image"
              value={formik.values.ingredient_image}
              placeholder="Example.jpg..."
              onChange={formik.handleChange}
            />
          </FormField>
          <Button color="green" type="submit">
            Add Ingredient
          </Button>
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Button color="black" onClick={handleClick}>
            Hide Form
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IngredientForm;
