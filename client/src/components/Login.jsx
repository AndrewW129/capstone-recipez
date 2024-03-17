// import {useHistory} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import "./Login.css";

function Login({ updateUser }) {
  Login.propTypes = {
    updateUser: PropTypes.func,
  };

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is empty"),
    password: yup.string().required("Password is empty"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            console.log(user);
            updateUser(user);
            navigate("/home"); // Main Content Component
          });
        } else {
          updateUser(null);
          navigate("/login");
        }
      });
    },
  });
  return (
    <div className="form-container">
      <h2>Log In!</h2>
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
        <button type="submit">Log In</button>
      </form>
      <p>Need an account?</p>
      <button>go to signup</button>
    </div>
  );
}

export default Login;