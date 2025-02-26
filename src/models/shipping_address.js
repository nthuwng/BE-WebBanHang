const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  address: { type: String, required: true },
  email: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model("ShippingAddress", shippingAddressSchema);
