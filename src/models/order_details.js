const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const orderDetailSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});
orderDetailSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
