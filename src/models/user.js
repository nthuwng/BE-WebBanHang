const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");


const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  avatar: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, // Liên kết với roles
}, { timestamps: true });

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("User", userSchema);

