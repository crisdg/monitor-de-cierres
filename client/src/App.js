import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from "./config/axios";
import Monitor from "./components/monitor";
import NuevaZona from "./components/nuevaZona";
import Zona from "./components/zona";
import Login from "./components/login";
import RegisterUser from "./components/registerUser";
import NavBar from "./components/navbar";
import ZonaInfo from "./components/zonaInfo";
import Busqueda from "./components/busqueda";
import { AuthContextProvider } from "./context/authContext";

import "./App.css";

function App() {
  const [zonas, setZonas] = useState([]);
  const [consultar, setConsultar] = useState(true);
  const [zonasFilter, setZonasFilter] = useState([]);
  const [date, setDate] = useState("");
  const [userName, setUserName] = useState(
    window.sessionStorage.getItem("data")
  );

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
  }, [consultar, zonasFilter, userName]);

  const myDate = (e) => {
    setDate(e.target.value);

    setConsultar(true);
  };

  return (
    <AuthContextProvider>
      <Router>
        <NavBar setUserName={setUserName} user={userName} />

        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (!userName || userName === null) {
                return <Login setUserName={setUserName} />;
              } else {
                return (
                  <Monitor
                    data={zonasFilter}
                    date={date}
                    myDate={myDate}
                    setConsultar={setConsultar}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/zona/:id"
            render={(props) => {
              if (!userName || userName === null) {
                return <Login setUserName={setUserName} />;
              } else {
                return (
                  <Zona
                    userName={userName}
                    data={zonas.filter(
                      (item) => item._id === props.match.params.id
                    )}
                    id={props.match.params.id}
                    setConsultar={setConsultar}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/zonaInfo/:id"
            render={(props) => {
              if (!userName || userName === null) {
                return <Login setUserName={setUserName} />;
              } else {
                return (
                  <ZonaInfo
                    userName={userName}
                    data={zonas.filter(
                      (item) => item._id === props.match.params.id
                    )}
                    id={props.match.params.id}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/nueva"
            render={(props) => {
              if (!userName || userName === null) {
                return <Login setUserName={setUserName} />;
              } else {
                return (
                  <NuevaZona userName={userName} setConsultar={setConsultar} />
                );
              }
            }}
          />
          <Route
            exact
            path="/login"
            render={(props) => {
              return <Login />;
            }}
          />

          <Route exact path="/logout" />
          <Route
            exact
            path="/registrar"
            component={(props) => {
              return <RegisterUser />;
            }}
          />
          <Route
            exact
            path="/busqueda"
            component={() => {
              return <Busqueda />;
            }}
          />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
