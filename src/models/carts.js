const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  total_price: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "checked_out"], default: "active" },
  create_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
