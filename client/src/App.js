import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from "./config/axios";
import Monitor from "./components/monitor";
import NuevaZona from "./components/nuevaZona";
import Zona from "./components/zona";
import "./App.css";

function App() {
  const [zonas, setZonas] = useState([]);
  const [consultar, setConsultar] = useState(true);
  const [zonasFilter, setZonasFilter] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    if (consultar) {
      const consultarZonas = () => {
        clienteAxios
          .get("/zonas")
          .then((respuesta) => {
            setZonas(respuesta.data);
            setConsultar(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      consultarZonas();
      const filtrado = zonas.filter((item) => item.fecha === date);

      setZonasFilter(filtrado);
    }
  }, [consultar, zonasFilter]);

  const myDate = (e) => {
    setDate(e.target.value);
    setConsultar(true);
  };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Monitor data={zonasFilter} date={date} myDate={myDate} />
          )}
        />
        <Route
          exact
          path="/zona/:id"
          render={(props) => {
            const zona = zonas.filter(
              (item) => item._id === props.match.params.id
            );

            return (
              <Zona
                data={zona[0]}
                id={props.match.params.id}
                setConsultar={setConsultar}
              />
            );
          }}
        />
        <Route
          exact
          path="/nueva"
          render={(props) => <NuevaZona setConsultar={setConsultar} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
