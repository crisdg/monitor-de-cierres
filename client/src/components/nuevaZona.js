import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";

function NuevaZona(props) {
  const [zona, setZona] = useState({});
  const [nZona, setNzona] = useState("");
  const [camp, setCamp] = useState("");
  const [ruta, setRuta] = useState("");
  const handleBack = (e) => {
    e.preventDefault();
    props.history.push("/");
    return null;
  };

  const guardarZona = async (e) => {
    e.preventDefault();
    setZona(nuevaZona);

    await clienteAxios
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
    setNzona(e.target.value);
    setZona(nuevaZona);
  };

  const handleCampaña = async (e) => {
    e.preventDefault();

    setCamp(e.target.value);
    await setZona(nuevaZona);
  };

  const handleRuta = async (e) => {
    nuevaZona.ruta = e.target.value;
    await setZona(nuevaZona);
  };

  const handleDate = (e) => {
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
    campaña: camp,
    zona: nZona,
    ruta: "",
    tildado: false,
    administracion: false,
    facturacion: false,
    cierreTildado: {
      fechaCierre: null,
      usuarioCierre: null,
    },
    cierreAdministracion: {
      fechaCierre: null,
      usuarioCierre: null,
    },
    cierreFacturacion: {
      fechaCierre: null,
      usuarioCierre: null,
    },
  };
  return (
    <div className="container-fluid zona">
      <div className="zona-form--container">
        <form action="post" className="" onSubmit={guardarZona}>
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            value={today}
            onChange={handleDate}
            className="zona-form--input"
          />
          <label htmlFor="campaña">Campaña</label>
          <select
            name="campaña"
            id="campaña"
            onChange={handleCampaña}
            value={camp}
          >
            <option value="202101">202101</option>
            <option value="202102">202102</option>
            <option value="202103">202103</option>
            <option value="202104">202104</option>
          </select>
          <label htmlFor="zona">Zona</label>
          <input
            type="text"
            name="zona"
            id="zona"
            minLength="3"
            maxLength="3"
            pattern="^[0-9]+"
            className="zona-form--input"
            onChange={handleChange}
            required
          />
          <label htmlFor="ruta">ruta</label>
          <input
            type="text"
            id="ruta"
            minLength="3"
            maxLength="3"
            pattern="^[0-9]+"
            className="zona-form--input"
            onChange={handleRuta}
            required
          />
          <input
            type="submit"
            value="Guardar"
            id="guardar"
            className="form-btn"
          />
          <input
            type="button"
            value="volver"
            id="volver"
            className="form-btn"
            onClick={handleBack}
          />
        </form>
      </div>
    </div>
  );
}

export default withRouter(NuevaZona);
