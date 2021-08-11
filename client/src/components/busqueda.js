import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Table from "react-bootstrap/Table";

function Busqueda() {
  const [busqueda, setBusqueda] = useState("");
  const [dataZona, setDataZona] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(busqueda);
    await clienteAxios
      .post("/busqueda", { zona: busqueda })
      .then((res) => {
        setDataZona(res.data);
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  if (dataZona.length === 0) {
    return (
      <div className="busqueda--search-input">
        <div className="container">
          <form action="/busqueda" method="post" onSubmit={handleSubmit}>
            <div className="row busqueda--search-container">
              <input
                type="text"
                minLength="3"
                maxLength="3"
                pattern="^[0-9]+"
                className="zona-form--input"
                onChange={async (e) => {
                  const target = e.target.value;
                  setBusqueda(target);
                }}
              />
              <input
                type="submit"
                value=""
                className="busqueda--search-button"
              />
            </div>
          </form>

          <h3>no hay datos de zona {busqueda}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="busqueda--search-input">
          <form action="/busqueda" method="post" onSubmit={handleSubmit}>
            <div className=" row busqueda--search-container">
              <input
                type="text"
                minLength="3"
                maxLength="3"
                pattern="^[0-9]+"
                className="zona-form--input"
                onChange={async (e) => {
                  const target = e.target.value;
                  setBusqueda(target);
                }}
              />
              <input
                type="submit"
                value=""
                className="busqueda--search-button"
              />
            </div>
          </form>
        </div>
        <div className="busqueda--main-table">
          <Table size="sm">
            <thead>
              <tr>
                <td>campaña</td>
                <td>zona</td>
                <td>ruta</td>
                <td>fecha</td>
                <td>info</td>
              </tr>
            </thead>
            <tbody>
              {dataZona.map((item) => {
                return (
                  <tr>
                    <td>{item.campaña}</td>
                    <td>{item.zona}</td>
                    <td>{item.ruta}</td>
                    <td>{item.fecha}</td>
                    <td>
                      <Link to={`/zonaInfo/${item._id}`}>
                        <div className="monitor--info-button busqueda--info-button"></div>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Busqueda;
