import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import "../App.css";
import swal from "sweetalert";
const Zona = (props) => {
  const [zona, setZona] = useState({});
  const [data, setData] = useState({});
  const [tildadoCheck, setTildadoCheck] = useState();
  const [admCheck, setAdmCheck] = useState();
  const [factCheck, setFactCheck] = useState();
  const [tildadoDisabled, setTildadoDisabled] = useState();
  const [admDisabled, setAdmDisabled] = useState();
  const [factDisabled, setFactDisabled] = useState();
  //verifica que haya props para evitar error en el render
  useEffect(() => {
    const getData = async () => {
      const url = `/zonas/${props.id}`;
      await clienteAxios
        .get(url)
        .then((response) => {
          console.log(response);
          setZona(response.data);
          setTildadoCheck(response.data.tildado);
          setAdmCheck(response.data.administracion);
          setFactCheck(response.data.facturacion);
          setTildadoDisabled(response.data.tildado);
          setAdmDisabled(response.data.administracion);
          setFactCheck(response.data.facturacion);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  if (!props.data || props.data === undefined) {
    props.history.push("/");
    return null;
  }

  //construye objeto modelo para mutar y enviar a db segun cambien los checkbox
  const checkData = {
    fecha: zona.fecha,
    zona: zona.zona,
    tildado: zona.tildado,
    administracion: zona.administracion,
    facturacion: zona.facturacion,
  };
  //actualiza la info a la db, verifica la combinaciones de checkbox mediante If
  const updateData = async (e) => {
    e.preventDefault();

    const url = `/zonas/${props.id}`;

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

  //elmina el registro actual de la db
  const deleteZona = async () => {
    const url = `/zonas/${props.id}`;

    await clienteAxios.delete(url).then((res) => console.log(res));
    props.history.push("/");
    props.setConsultar(true);
  };

  return (
    <div className="container-fluid zona">
      <div className="zona-form--container">
        <form method="post" className="zona-form--form">
          <div className="zona-form--items">
            <h2>Zona {zona.zona} </h2>
            <hr />
            <label for="tildado">Cierre tildado</label>
            <input
              className="check"
              type="checkbox"
              id="tildado"
              name="tildado"
              defaultChecked={zona.tildado}
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
              defaultChecked={zona.administracion}
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
              defaultChecked={zona.facturacion}
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
