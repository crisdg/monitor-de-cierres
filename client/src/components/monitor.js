import { React } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function TablaMonitor(props) {
  const refrescarConsulta = () => {
    props.setConsultar(true);
  };
  return (
    <div className="container d-flex">
      <div className="header">
        <div className="header--date-imput">
          <input
            type="date"
            name="fechaFiltro"
            id="fechaFiltro"
            className="monitor--filtro"
            onChange={props.myDate}
            value={props.date}
          />
        </div>
        <div className="header--refresh-button">
          <button className="refresh" onClick={refrescarConsulta}></button>
        </div>
      </div>

      <Table
        striped
        bordered
        hover
        className="monitor--table"
        size="sm"
        responsive
      >
        <thead className="monitor--table-header">
          <tr>
            <th key="1">Fecha</th>
            <th key="2">Orden</th>
            <th key="54">Año/Camp.</th>
            <th key="3">Zona</th>
            <th key="55">Ruta</th>
            <th key="4">cierre tildado</th>
            <th key="5">informe adm.</th>
            <th key="6">informe fact.</th>
            <th key="7">Cierre</th>
            <th key="90">Info</th>
          </tr>
        </thead>
        <tbody className="monitor--table-body">
          {props.data.map((zona, key) => {
            return (
              <tr key={key + 23}>
                <td key={key + 9}>{zona.fecha}</td>
                <td key={key + 10}>{key}</td>
                <td>{zona.campaña}</td>
                <td key={key + 11}>{zona.zona}</td>
                <td>{zona.ruta}</td>
                <td
                  key={key + 12}
                  className={zona.tildado === true ? "true" : "false"}
                >
                  {zona.tildado === true ? " " : ""}
                </td>
                <td
                  key={key + 13}
                  className={zona.administracion === true ? "true" : "false"}
                >
                  {zona.administracion === true ? " " : ""}
                </td>
                <td
                  key={key + 14}
                  className={zona.facturacion === true ? "true" : "false"}
                >
                  {zona.facturacion === true ? " " : ""}
                </td>
                <td key={key + 15}>
                  <div className="monitor--cierre-button">
                    <Link to={`/zona/${zona._id}`} data={zona}>
                      Cierre
                    </Link>
                  </div>
                </td>

                <td key={key + 17}>
                  <div className="monitor--info-button">
                    <Link to={`/zonaInfo/${zona._id}`} data={zona}>
                      Info
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="monitor--agregar-button">
        <Link to={`/nueva`}>+</Link>
      </div>
    </div>
  );
}

export default TablaMonitor;
