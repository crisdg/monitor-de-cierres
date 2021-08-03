import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";

function ZonaInfo(props) {
  const data = props.data.map((item) => {
    return item;
  });

  if (data.length === 0) {
    return <p>...</p>;
  }
  console.log(data);

  const fechaCierreTildado = new Date(
    data[0].cierreTildado.fechaCierre
  ).toLocaleDateString();

  const horaCierreTildado =
    new Date(data[0].cierreTildado.fechaCierre).getHours() +
    ":" +
    new Date(data[0].cierreTildado.fechaCierre).getMinutes();

  const fechaCierreAdministracion = new Date(
    data[0].cierreAdministracion.fechaCierre
  ).toLocaleDateString();

  const horaCierreAdministracion =
    new Date(data[0].cierreAdministracion.fechaCierre).getHours() +
    ":" +
    new Date(data[0].cierreAdministracion.fechaCierre).getMinutes();

  const fechaCierreFacturacion = new Date(
    data[0].cierreFacturacion.fechaCierre
  ).toLocaleDateString();

  const horaCierreFacturacion =
    new Date(data[0].cierreFacturacion.fechaCierre).getHours() +
    ":" +
    new Date(data[0].cierreFacturacion.fechaCierre).getMinutes();

  const volver = () => {
    props.history.push("/");
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <h2>Zona: {data[0].zona}</h2>
        <button className="zonaInfo--button-back" onClick={volver}>
          Volver
        </button>
      </div>

      <Table striped bordered size="sm" responsive>
        <thead>
          <tr>
            <td>tildado</td>
            <td>Fecha</td>
            <td>hora</td>
            <td>user</td>
            <td>Adm.</td>
            <td>Fecha</td>
            <td>Hora</td>
            <td>User</td>
            <td>Fact.</td>
            <td>Fecha</td>
            <td>Hora</td>
            <td>User</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data[0].tildado === true ? "OK" : "Pend."}</td>
            <td>
              {data[0].tildado === true ? `${fechaCierreTildado}` : "Pend."}
            </td>
            <td>
              {data[0].tildado === true ? `${horaCierreTildado}` : "Pend."}
            </td>
            <td>
              {data[0].tildado === true
                ? `${data[0].cierreTildado.usuarioCierre}`
                : "Pend."}
            </td>
            <td>{data[0].administracion === true ? "OK" : "Pend."}</td>
            <td>
              {data[0].administracion === true
                ? `${fechaCierreAdministracion}`
                : "Pend."}
            </td>
            <td>
              {data[0].administracion === true
                ? `${horaCierreAdministracion}`
                : "Pend."}
            </td>
            <td>
              {data[0].administracion === true
                ? `${data[0].cierreAdministracion.usuarioCierre}`
                : "Pend."}
            </td>
            <td>{data[0].facturacion === true ? "OK" : "Pend."}</td>
            <td>
              {data[0].facturacion === true
                ? `${fechaCierreFacturacion}`
                : "Pend."}
            </td>
            <td>
              {" "}
              {data[0].facturacion === true
                ? `${horaCierreFacturacion}`
                : "Pend."}
            </td>
            <td>
              {data[0].facturacion === true
                ? `${data[0].cierreFacturacion.usuarioCierre}`
                : "Pend."}
            </td>
          </tr>
        </tbody>
      </Table>
      <p></p>
    </div>
  );
}

export default withRouter(ZonaInfo);
