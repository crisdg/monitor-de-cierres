import { useState, useEffect } from "react";
import clienteAxios from "./config/axios";
import Monitor from "./components/monitor";

function App() {
  const [zonas, setZonas] = useState([]);
  const [consultar, setConsultar] = useState(true);
  useEffect(() => {
    if (consultar) {
      const consultarZonas = () => {
        clienteAxios
          .get("/zonas")
          .then((respuesta) => {
            console.log(respuesta);
            setZonas(respuesta.data);
            setConsultar(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      consultarZonas();
    }
  }, [consultar]);
  return (
    <div className="container">
      <Monitor data={zonas} />
    </div>
  );
}

export default App;
