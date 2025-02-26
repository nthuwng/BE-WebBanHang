const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // "user" hoặc "admin"
  description: { type: String }
});

module.exports = mongoose.model("Role", roleSchema);
