const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZonaSchema = new Schema({
  fecha: {
    type: String,
    trim: true,
  },

  zona: {
    type: String,
    trim: true,
  },

  tildado: {
    type: Boolean,
    trim: true,
  },
  administracion: {
    type: Boolean,
    trim: true,
  },
  facturacion: {
    type: Boolean,
    trim: true,
  },
  cierreTildado: {
    fechaCierre: {
      type: Date,
      trim: true,
    },
    usuarioCierre: {
      type: String,
      trim: true,
    },
  },
  cierreAdministracion: {
    fechaCierre: {
      type: Date,
      trim: true,
    },
    usuarioCierre: {
      type: String,
      trim: true,
    },
  },
  cierreFacturacion: {
    fechaCierre: {
      type: Date,
      trim: true,
    },
    usuarioCierre: {
      type: String,
      trim: true,
    },
  },
});

module.exports = mongoose.model("Zona", ZonaSchema);
