import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const RegisterUser = () => {
  return (
    <div className="container login-form">
      <div className="login-form--container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingrese usuario" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Repita contraseña" />
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
