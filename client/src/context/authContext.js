import React, { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInRes = await clienteAxios.get("/loggedIn");
    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
