const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    factory: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Liên kết với categories
  },
  { timestamps: true }
);

productSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("Product", productSchema);
