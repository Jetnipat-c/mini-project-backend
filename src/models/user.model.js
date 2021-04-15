const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: string, require: true },
  password: { type: string, require: true },
  firstname: { type: string, require: true },
  lastname: { type: string, require: true },
});

module.exports = mongoose.model('User',UserSchema)
