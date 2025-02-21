const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const moment = require("moment-timezone");
//shape data
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // Lưu theo UTC, không đổi múi giờ khi lưu
  },
  avatar: { type: String, default: "/images/avatar/default.png" },
});
adminSchema.plugin(mongoose_delete, { overrideMethods: "all" });

adminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.createdAt = moment(obj.createdAt)
    .tz("Asia/Ho_Chi_Minh")
    .format("DD/MM/YYYY HH:mm:ss"); // Hiển thị đúng giờ VN khi trả về API
  return obj;
};
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
