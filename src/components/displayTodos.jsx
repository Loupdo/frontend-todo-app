import { useApp } from "../context/context";

//import components
import CreateTask from "./createTask";

export default function DisplayTodos() {
  const { todos } = useApp();
  return (
    <div className="container">
      <div className="row">
        {
          // Loop through the todos array and render tasks
          todos.map((todo, index) => (
            <div key={index}>
              <CreateTask todo={todo} index={index} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
