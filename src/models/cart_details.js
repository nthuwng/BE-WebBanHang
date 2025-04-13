const mongoose = require("mongoose");
// const mongoose_delete = require("mongoose-delete");

const cartDetailSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});
// cartDetailSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("CartDetail", cartDetailSchema);
