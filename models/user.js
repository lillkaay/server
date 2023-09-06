// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  organization: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
