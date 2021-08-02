import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">Monitor</Navbar.Brand>
            <Nav className="me-auto">
              {loggedIn === false && <Nav.Link href="login">Login</Nav.Link>}
              {loggedIn === true && <Navbar.Text>{props.user}</Navbar.Text>}
              {loggedIn === true && (
                <Nav.Link href="logout" onClick={logout}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </Router>
    </div>
  );
}

export default NavBar;
