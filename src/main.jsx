import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//import components
import Home from "./components/home.jsx";
import Register from "./components/register.jsx";
import Todos from "./components/todos.jsx";

//import context
import { AppProvider } from "./context/context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
