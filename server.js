require("dotenv").config(); //import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

//conecta a mongo
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI || "mongodb://localhost/monitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("conected", () => {
  console.log("mongoose conectado");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//llamar a build de cliente
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//http request logger
app.use(morgan("tiny"));

//habilitar routing
app.use("/", routes());

app.listen(PORT, console.log(`server is running on port: ${PORT}`));
