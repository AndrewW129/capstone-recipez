import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext.jsx";
import * as yup from "yup";

function Signup() {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const setUser = (user) => context.setUser(user);

  const updateUser = (user) => {
    setUser(user);
  };

  const handleReset = () => {
    formik.resetForm();
  };

  const handleClick = () => {
    navigate("/login");
  };

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().email("Please enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      profile_image: "",
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
            updateUser(data);
            handleReset();
            navigate("/login");
          });
        } else {
          updateUser({
            username: "Guest User",
            profile_image:
              "data:image/png;base64,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",
            recipes: [],
          });
          handleReset();
          navigate("/signup");
        }
      });
    },
  });
  return (
    <div className="component-container">
      <div className="form-container">
        <h2>Create an Account!</h2>
        {formik.errors &&
          Object.values(formik.errors).map((error, index) => (
            <p className="error-message" key={index}>
              {" "}
              {error}
            </p>
          ))}
        <form className="form" onSubmit={formik.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            placeholder="Username..."
            onChange={formik.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            placeholder="Password..."
            onChange={formik.handleChange}
          />
          <label>Profile Picture:</label>
          <input
            type="text"
            name="profile_image"
            value={formik.values.profile_image}
            placeholder="Profile Picture..."
            onChange={formik.handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            placeholder="Email..."
            onChange={formik.handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account?</p>
        <button onClick={handleClick}>go to login</button>
      </div>
    </div>
  );
}

export default Signup;
