const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  factory: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" } // Liên kết với categories
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
