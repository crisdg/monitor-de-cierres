//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

//conecta a mongo
const MONGODB_URI =
  "mongodb+srv://cgomez:Cgomez.1988@monitordb.osbrc.mongodb.net/monitor?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost/monitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("conected", () => {
  console.log("mongoose conectado");
});

//http request logger
app.use(morgan("tiny"));

//habilitar routing
app.use("/", routes());

app.listen(PORT, console.log(`server is running on port: ${PORT}`));
