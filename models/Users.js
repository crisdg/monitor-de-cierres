const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  user: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    trim: true,
  },

  rol: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Users", UsersSchema);
