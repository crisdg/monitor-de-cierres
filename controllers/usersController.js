const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//crea un nuevo usuario
exports.nuevoUser = async (req, res, next) => {
  //crear objeto zona con datos req.body
  const user = new Users(req.body);
  try {
    await user.save();
    console.log(user, "desde save");
    res.json({ mensaje: "user agregada correctamente" });

    //crear firma token
    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.JWT_SECRET
    );

    //enviar token a cookie hhttp-only
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
    next();
  }
};

//login de usuario
exports.loginUser = async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password)
      return res
        .status(400)
        .json({ errorMessage: "ingrese todos los datos requeridos" });

    const existingUser = await Users.findOne({ user });

    if (!existingUser) {
      return res
        .status(401)
        .json({ errorMessage: "usuario o contraseña invalida" });
    }

    const passwordValid = await bcrypt.compare(password, existingUser.password);
    if (!passwordValid)
      return res.status(401).json({ errorMessage: "password incorrecto" });
    //crear firma token
    const token = jwt.sign(
      {
        user: existingUser._id,
        userName: existingUser.user,
      },
      process.env.JWT_SECRET
    );

    //enviar token a cookie hhttp-only

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

//user logout
exports.logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
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

exports.loggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
};
