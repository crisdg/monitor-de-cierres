const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zonaController");
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");

module.exports = function () {
  //agregar zona via POST
  router.post("/zonas", auth, zonaController.nuevaZona);
  //obtener todos los registros
  router.get("/zonas", zonaController.obtenerZonas);
  //obtener registro por id
  router.get("/zonas/:id", zonaController.obtenerZona);
  //actualizar registro
  router.put("/zonas/:id", auth, zonaController.actualizarZona);
  //eliminar registro
  router.delete("/zonas/:id", auth, zonaController.eliminarZona);

  //obtener usuarios
  router.get("/users", auth, usersController.obtenerUsers);
  //crear usuario
  router.post("/users/registrar", auth, usersController.nuevoUser);
  //login usuario
  router.post("/login", usersController.loginUser);
  router.get("/logout", usersController.logoutUser);
  // verifica si hay un usuario loggeado
  router.get("/loggedIn", usersController.loggedIn);

  return router;
};
