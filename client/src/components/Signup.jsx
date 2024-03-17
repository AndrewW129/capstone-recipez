// import {useHistory} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import "./Signup.css";

function Signup({ updateUser }) {
  Signup.propTypes = {
    updateUser: PropTypes.func,
  };

  const navigate = useNavigate();

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
          updateUser(null);
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
