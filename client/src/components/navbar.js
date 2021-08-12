import React, { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import clienteAxios from "../config/axios";
import AuthContext from "../context/authContext";

function NavBar(props) {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const logout = async (e) => {
    e.preventDefault();
    await clienteAxios.get("/logout");
    await getLoggedIn();
    window.sessionStorage.removeItem("data");
    props.setUserName(null);
  };
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Monitor</Navbar.Brand>
          <Nav className="me-auto">
            {loggedIn === false && <Link to="/login">Login</Link>}
            {loggedIn === true && <Navbar.Text>{props.user}</Navbar.Text>}
            {loggedIn === true && (
              <Nav.Link to="/logout" onClick={logout}>
                Logout
              </Nav.Link>
            )}
            {loggedIn === true && <Link to="/busqueda">Buscar</Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
