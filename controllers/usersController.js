const Users = require("../models/Users");
//crea un nuevo usuario
exports.nuevoUser = async (req, res, next) => {
  //crear objeto zona con datos req.body
  const user = new Users(req.body);
  try {
    await user.save();
    console.log(user, "desde save");
    res.json({ mensaje: "user agregada correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//obtiene todos los usuarios
exports.obtenerUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    next();
  }
};
