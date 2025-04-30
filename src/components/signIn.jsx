import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

//import libraries
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

//import context
import { useApp } from "../context/context";

export default function SigninForm() {
  const { setMessage, setToken } = useApp();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must contain at least 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const encodedUsername = encodeURIComponent(values.userName);
        const encodedPassword = encodeURIComponent(values.password);
        // API endpoint for user signIn (loginRoute)
        const response = await axios.get(
          `https://backend-todo-app-6237.onrender.com/api/login?username=${encodedUsername}&password=${encodedPassword}`
        );
        setMessage(response.data.message);
        setToken(response.data.token);
        navigate("/todos");
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response) {
          const errorMessage = error.response.data;
          setError(errorMessage);
        } else {
          setError("Failed to connect to the server.");
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="formLogin">
      <div className="row">
        <div className="form-group col-md-5 offset-md-1">
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            className="form-control"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <p className="error">{formik.errors.userName}</p>
          ) : null}
        </div>
        <div className="form-group col-md-5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="d-flex justify-content-center my-3">
          <Button variant="info" type="submit" className="m-2">
            Submit
          </Button>
          <Button variant="secondary" as={Link} to="/register" className="m-2">
            Register
          </Button>
        </div>
        {
          //Errors are displayed if any exists
          error ? (
            <p className="error w-100 text-align-center">{error}</p>
          ) : (
            <></>
          )
        }
      </div>
    </form>
  );
}
