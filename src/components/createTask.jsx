import { Card, Button } from "react-bootstrap";

//import context
import { useApp } from "../context/context";

function CreateTask({ todo, index }) {
  // function define in context
  const { deleteTodo, editTodo } = useApp();

  return (
    <Card bg="info-subtle" text="dark" className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => editTodo(index)}
            variant="outline-primary mx-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteTodo(index)}
            variant="outline-danger mx-2"
          >
            Delete
          </Button>
        </div>
        <Card.Title>
          <strong>{todo}</strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CreateTask;
