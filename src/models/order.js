const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    payment_method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    create_at: { type: Date, default: Date.now },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
