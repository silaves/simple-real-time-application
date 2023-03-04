import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {removeTokenFromLocalStorage} from "../../utils/token";

export const Header = (props) => {
  const logout = () => {
    removeTokenFromLocalStorage();
    window.location.href = '/sign-in';
  }

  return (
  <Navbar bg="dark" variant={"dark"} expand="lg">
    <Container>
      <Navbar.Brand href="#">Simple Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/client"}>Clientes</Nav.Link>
          <Nav.Link as={Link} to={"/product"}>Productos</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}