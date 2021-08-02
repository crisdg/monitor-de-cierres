import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import clienteAxios from "../config/axios";
const RegisterUser = (props) => {
  const [user, setUSer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [rol, setRol] = useState("");

  let history = useHistory();

  //guarda el usuario en db
  const guardarUser = async (e) => {
    const data = {
      user: user,
      password: password,
      rol: rol,
    };
    e.preventDefault();
    console.log(user, password, confirmPassword);
    if (password === confirmPassword) {
      await clienteAxios.post("/users/registrar", data);

      console.log("guardado", user, password, rol);
      history.push("/");
    } else {
      console.log("los password no coinciden");
    }
  };

  return (
    <div className="container login-form">
      <div className="login-form--container">
        <Form onSubmit={guardarUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese usuario"
              required
              onChange={(e) => {
                setUSer(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repita contraseña"
              required
              onChange={(e) => {
                setConfirmPasword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <select
              name="select-rol"
              id="rol"
              required
              onChange={(e) => {
                setRol(e.target.value);
              }}
            >
              <option value="">Ingrese rol</option>
              <option value="tildado">Tildado</option>
              <option value="administracion">Administracion</option>
              <option value="facturacion">Facturacion</option>
            </select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUser;
