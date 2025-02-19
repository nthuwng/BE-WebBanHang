const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
//shape data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  city: String,
  phone: String,
  password: String,
});
userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("user", userSchema);

module.exports = User;
