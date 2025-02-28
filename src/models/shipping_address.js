const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const shippingAddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  address: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
});
shippingAddressSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("ShippingAddress", shippingAddressSchema);
