import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useApp } from "../context/context";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { message, setMessage, setToken, setTodos, token } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setMessage("Please, sign in!");
    setToken("");
    setTodos([]);
    navigate("/");
  };

  return (
    <Navbar bg="info" expand="lg" data-bs-theme="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="Logo">
          TO-DOs
        </Navbar.Brand>
        <Nav className="d-flex">
          <Navbar.Text className="ms-lg-3">
            <h5>{message}</h5>
          </Navbar.Text>
          {token ? (
            <Nav.Link as={Link} to="/" className="ms-4" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <></>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
