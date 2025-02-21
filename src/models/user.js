const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const moment = require("moment-timezone");

// Shape data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  phone: { type: String },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // Lưu theo UTC, không đổi múi giờ khi lưu
  },
  avatar: { type: String, default: "/images/avatar/default.png" },
});

// Plugin hỗ trợ xóa mềm
userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Chuyển đổi `createdAt` khi trả về API
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.createdAt = moment(obj.createdAt)
    .tz("Asia/Ho_Chi_Minh")
    .format("DD/MM/YYYY HH:mm:ss"); // Hiển thị đúng giờ VN khi trả về API
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
