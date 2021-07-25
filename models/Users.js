const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UsersSchema = new Schema({
  user: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  rol: {
    type: String,
    trim: true,
    required: true,
  },
});
UsersSchema.plugin(uniqueValidator, {
  message: "el {PATH}  ya existe con otro usuario",
});
UsersSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UsersSchema.pre("save", function (next) {
  console.log("desde pre save");
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
