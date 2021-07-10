import { useState } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import "../App.css";
import swal from "sweetalert";
const Zona = (props) => {
  const [data, setData] = useState();
  const [tildadoCheck, setTildadoCheck] = useState(props.data.tildado);
  const [admCheck, setAdmCheck] = useState(props.data.administracion);
  const [factCheck, setFactCheck] = useState(props.data.facturacion);
  const [tildadoDisabled, setTildadoDisabled] = useState(props.data.tildado);
  const [admDisabled, setAdmDisabled] = useState(props.data.administracion);
  const [factDisabled, setFactDisabled] = useState(props.data.facturacion);

  if (!props.data) {
    props.history.push("/");
    return null;
  }
  const checkData = {
    fecha: props.data.fecha,
    zona: props.data.zona,
    tildado: props.data.tildado,
    administracion: props.data.administracion,
    facturacion: props.data.facturacion,
  };

  const updateData = async (e) => {
    e.preventDefault();

    const url = `/zonas/${props.data._id}`;

    if (tildadoCheck === true && admCheck === false && factCheck === false) {
      setData(checkData);
      await clienteAxios
        .put(url, data)
        .then((res) => {
          console.log(res, "modificado");
        })
        .catch((error) => {
          console.log(error);
        });
      props.setConsultar(true);
      swal("Cierre realizado!", "ok para seguir!", "success");
      props.history.push("/");
      return null;
    } else if (
      tildadoCheck === true &&
      admCheck === true &&
      factCheck === false
    ) {
      await clienteAxios
        .put(url, data)
        .then((res) => {
          console.log(res, "modificado");
        })
        .catch((error) => {
          console.log(error);
        });

      props.setConsultar(true);
      swal("Cierre realizado!", "ok para seguir!", "success");
      props.history.push("/");
      return null;
    } else if (
      tildadoCheck === true &&
      admCheck === true &&
      factCheck === true
    ) {
      await clienteAxios
        .put(url, data)
        .then((res) => {
          console.log(res, "modificado");
        })
        .catch((error) => {
          console.log(error);
        });
      props.setConsultar(true);
      swal("Cierre realizado!", "ok para seguir!", "success");
      props.history.push("/");
      return null;
    } else {
      swal("error!", "Falta cierre anterior!", "error");
    }
  };

  const volver = (e) => {
    e.preventDefault();
    alert("esta volviendo sin modificar datos");
    props.history.push("/");
  };

  const deleteZona = async () => {
    const url = `/zonas/${props.data._id}`;

    await clienteAxios.delete(url).then((res) => console.log(res));
    props.history.push("/");
    props.setConsultar(true);
  };

  return (
    <div className="container-fluid zona">
      <div className="zona-form--container">
        <form method="post" className="zona-form--form">
          <div className="zona-form--items">
            <h2>Zona {props.data.zona} </h2>
            <hr />
            <label for="tildado">Cierre tildado</label>
            <input
              className="check"
              type="checkbox"
              id="tildado"
              name="tildado"
              defaultChecked={props.data.tildado ? true : false}
              disabled={tildadoDisabled}
              onChange={(e) => {
                checkData.tildado = e.target.checked;

                if (tildadoCheck === false) {
                  setTildadoCheck(true);
                  setAdmDisabled(true);
                  setFactDisabled(true);
                } else {
                  setTildadoCheck(false);
                  setAdmDisabled(false);
                  setFactDisabled(false);
                }
                setData(checkData);
              }}
            ></input>
            <br />
            <label for="administracion">Cierre administrativo </label>
            <input
              className="check"
              type="checkbox"
              value=""
              name="administracion"
              defaultChecked={props.data.administracion}
              disabled={admDisabled}
              onChange={(e) => {
                checkData.administracion = e.target.checked;

                if (admCheck === false) {
                  setAdmCheck(true);
                  setTildadoDisabled(true);
                  setFactDisabled(true);
                } else {
                  setAdmCheck(false);
                  setTildadoDisabled(false);
                  setFactDisabled(false);
                }
                setData(checkData);
              }}
            ></input>
            <br />
            <label for="facturacion">Cierre facturacion </label>
            <input
              className="check"
              type="checkbox"
              value=""
              id="facturacion"
              name="facturacion"
              defaultChecked={props.data.facturacion}
              disabled={factDisabled}
              onChange={(e) => {
                checkData.facturacion = e.target.checked;

                if (factCheck === false) {
                  setFactCheck(true);
                  setTildadoDisabled(true);
                  setAdmDisabled(true);
                } else {
                  setFactCheck(false);
                  setAdmDisabled(false);
                  setTildadoDisabled(false);
                }
                setData(checkData);
              }}
            ></input>
            <br />
            <hr />
            <input
              className="form-btn"
              type="submit"
              value="cierre"
              onClick={updateData}
            />
            <input
              className="form-btn"
              type="submit"
              value="volver"
              onClick={volver}
            />
          </div>
        </form>
      </div>
      <button
        className="monitor--eliminar-button container-fluid"
        onClick={deleteZona}
      >
        Eliminar zona
      </button>
    </div>
  );
};

export default withRouter(Zona);
