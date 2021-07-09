import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import swal from "sweetalert";
function NuevaZona(props) {
  const [zona, setZona] = useState({});

  const handleBack = (e) => {
    e.preventDefault();
    props.history.push("/");
    return null;
  };

  const guardarZona = (e) => {
    e.preventDefault();
    setZona(nuevaZona);

    clienteAxios
      .post("/zonas", zona)
      .then((res) => {
        props.setConsultar(true);
        props.history.push("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    nuevaZona.zona = e.target.value;
    setZona(nuevaZona);
    console.log(nuevaZona.zona);
  };

  const handleDate = (e) => {
    e.preventDefault();
    nuevaZona.fecha = e.target.value;

    setZona(nuevaZona);
  };

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;

  let nuevaZona = {
    fecha: today,
    zona: "",
    tildado: false,
    administracion: false,
    facturacion: false,
  };
  return (
    <div className="zona-form--container">
      <form action="post" onSubmit={guardarZona}>
        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          name="fecha"
          id="fecha"
          value={today}
          onChange={handleDate}
        />
        <label htmlFor="zona">Zona</label>
        <input
          type="text"
          name="zona"
          id="zona"
          minLength="3"
          maxLength="3"
          pattern="^[0-9]+"
          onChange={handleChange}
          required
        />
        <input type="submit" value="Guardar" id="guardar" />
        <input type="button" value="volver" id="volver" onClick={handleBack} />
      </form>
    </div>
  );
}

export default withRouter(NuevaZona);
