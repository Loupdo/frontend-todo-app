import Button from "react-bootstrap/Button";
import { useState } from "react";

//import context
import { useApp } from "../context/context";

//import libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function TodoForm() {
  const { token, todos, setTodos } = useApp();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      task: "",
    },
    validationSchema: Yup.object({
      task: Yup.string()
        .required("Required")
        .min(3, "Must contain at least 3 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedTodos = [...todos, values.task];
        // API endpoint for updating todos (todosRoutes)
        const response = await axios.patch(
          "https://backend-todo-app-6237.onrender.com/api/login/todos",
          { todos: updatedTodos },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodos(response.data.todos);
        resetForm();
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group col-md-10 offset-md-1 formTodos">
        <label htmlFor="task">Please, enter a task:</label>
        <input
          id="task"
          name="task"
          type="text"
          className="form-control"
          placeholder="task"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.task}
        />
        {formik.touched.task && formik.errors.task && (
          <p className="error" style={{ color: "red" }}>
            {formik.errors.task}
          </p>
        )}
        <Button variant="info" type="submit" className="m-2">
          Submit
        </Button>
        {
          //Errors are displayed if any exists
          error ? <p className="error">{error}</p> : <></>
        }
      </div>
    </form>
  );
}
