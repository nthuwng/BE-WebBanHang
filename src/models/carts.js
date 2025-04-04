const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total_price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "checked_out"],
      default: "active",
    },
    cartDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartDetail" }],
    create_at: { type: Date, default: Date.now },
    sum: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("Cart", cartSchema);
