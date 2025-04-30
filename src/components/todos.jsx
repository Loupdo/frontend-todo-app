//import components
import NavBar from "../routes/navBar";
import TodoForm from "./todoForm";
import DisplayTodos from "./displayTodos";

export default function Todos() {
  return (
    <div className="container">
      <NavBar />
      <TodoForm />
      <DisplayTodos />
    </div>
  );
}
