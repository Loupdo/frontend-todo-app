import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [message, setMessage] = useState("Please, sign in!");
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // API endpoint for getting Todos (TodosRoute)
        const response = await axios.get(
          "https://backend-todo-app-6237.onrender.com/api/login/todos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTodos([]);
      }
    };

    if (token) {
      fetchTodos();
    }
  }, [token]);

  const deleteTodo = async (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);

    try {
      // API endpoint for updating Todos (TodosRoute)
      const response = await axios.patch(
        "https://backend-todo-app-6237.onrender.com/api/login/todos",
        { todos: updatedTodos },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Failed to update todos:", error);
    }
  };

  const editTodo = async (index) => {
    const newTask = prompt("Please edit task", todos[index]);
    if (newTask !== null) {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? newTask : todo
      );
      // API endpoint for updating Todos (TodosRoute)
      try {
        const response = await axios.patch(
          "https://backend-todo-app-6237.onrender.com/api/login/todos",
          { todos: updatedTodos },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Failed to update todos:", error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        message,
        setMessage,
        token,
        setToken,
        todos,
        setTodos,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
