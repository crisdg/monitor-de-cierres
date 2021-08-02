import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import clienteAxios from "../config/axios";
import AuthContext from "../context/authContext";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        user,
        password,
      };
      await clienteAxios.post("/login", loginData).then((res) => {
        const data = JSON.parse(res.config.data);

        sessionStorage.setItem("data", data.user);
        props.setUserName(data.user);
      });
      history.push("/");
      await getLoggedIn();
    } catch (error) {
      alert("datos incorrectos");
      console.log(error);
    }
  };

  return (
    <div className="container login-form">
      <div className="login-form--container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese usuario"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
