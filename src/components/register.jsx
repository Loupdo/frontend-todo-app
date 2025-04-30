import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

//import components
import NavBar from "../routes/navBar.jsx";

//import libraries
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    //Yup library is used for validation
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required").max(15, "Name is too long"),
      lastName: Yup.string().required("Required").max(20, "Name is too long"),
      userName: Yup.string()
        .required("Required")
        .min(3, "Username is too short"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must contain at least 8 characters")
        .matches(/.*[a-z].*/, "Must contain a lower case letter")
        .matches(/.*[A-Z].*/, "Must contain an upper case letter")
        .matches(/.*[0-9].*/, "Must contain a number")
        .matches(
          /.*[_=!#$%&()*+,-.:'/?@].*/,
          "Must contain a special characters"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Mismatched passwords"
      ),
    }),
    onSubmit: async (values) => {
      //ConfirmPassword is not transmitted to the API
      delete values.confirmPassword;
      try {
        // API endpoint for user registration (registerRoute)
        const response = await axios.post(
          `https://backend-todo-app-6237.onrender.com/api/register`,
          values
        );
        if (response.data) {
          console.log("Registration successful:", response.data);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // handle error from backend server
        if (error.response) {
          const errorMessage = error.response.data.message;
          setError(errorMessage);
        } else {
          setError("Failed to connect to the server.");
        }
      }
    },
  });

  return (
    <div className="container">
      <NavBar />
      <form onSubmit={formik.handleSubmit} className="formRegister">
        <div className="row">
          <div className="form-group col-md-5 offset-md-1">
            <label htmlFor="firstName">First Name*:</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="error">{formik.errors.firstName}</p>
            ) : null}
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="lastName">Last Name*:</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="error">{formik.errors.lastName}</p>
            ) : null}
          </div>

          <div className="form-group col-md-10 offset-md-1">
            <label htmlFor="userName">
              Username (must end by'@gmail.com')*:
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <p className="error">{formik.errors.userName}</p>
            ) : null}
          </div>
          <div className="form-group col-md-5 offset-md-1">
            <label htmlFor="password">Password*:</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="confirmPassword">Confirm password*:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="error">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
        </div>
        <div className="d-flex justify-content-center m-3">
          <Button
            variant="info"
            type="submit"
            className="justify-self-center m-3"
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            className="justify-self-center m-3"
            onClick={() => navigate("/")}
          >
            Cancel
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
      </form>
    </div>
  );
}
