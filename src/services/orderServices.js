const mongoose = require("mongoose");
const Order_details = require("../models/order_details");
const Order = require("../models/order");
const Shipping_address = require("../models/shipping_address");
const aqp = require("api-query-params");
const carts = require("../models/carts");
const Cart_details = require("../models/cart_details");

const postOrderServices = async (
  userID,
  payment_method_id,
  total_price,
  products,
  shipping_address,
  email,
  phone
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!userID) {
      throw new Error("User is not authenticated");
    }

    // ✅ Bước 1: Tạo đơn hàng trước (chưa có shipping_address)
    const newOrderData = {
      user: userID,
      payment_method: payment_method_id,
      total_price,
      status: "pending",
    };

    // Sử dụng session trong tất cả các thao tác database
    const savedOrder = await Order.create([newOrderData], { session }).then(
      (orders) => orders[0]
    );

    // ✅ Bước 2: Tạo shipping address, gán order._id vào
    const shippingAddressDoc = await Shipping_address.create(
      [
        {
          user: userID,
          order: savedOrder._id,
          address: shipping_address,
          email,
          phone,
        },
      ],
      { session }
    ).then((addresses) => addresses[0]);

    // ✅ Bước 3: Gán shipping_address._id ngược lại vào Order
    savedOrder.shipping_address = shippingAddressDoc._id;
    await savedOrder.save({ session });

    // ✅ Bước 4: Tạo chi tiết đơn hàng
    const orderDetails = products.map((product) => ({
      order: savedOrder._id,
      product: product.id,
      quantity: product.quantity,
      price: product.price,
    }));
    await Order_details.insertMany(orderDetails, { session });

    // ✅ Bước 5: Tìm và xóa giỏ hàng hiện tại của người dùng
    const cart = await carts.findOne({ user: userID }).session(session);
    if (cart) {
      // Xóa tất cả chi tiết giỏ hàng
      await Cart_details.deleteMany({ cart: cart._id }, { session });

      // Xóa giỏ hàng
      await carts.findByIdAndDelete(cart._id, { session });
    }

    await session.commitTransaction();
    return savedOrder;
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction error:", error);
    throw new Error("Error creating order: " + error.message);
  } finally {
    session.endSession();
  }
};
const getALLOrderServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = await Order.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();

  return result;
};

const putUpdateOrderServices = async (id, data) => {
  try {
    let result = await Order.findByIdAndUpdate(id, data, { new: true }).exec();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrderByUserIdAPIServices = async (userId) => {
  try {
    let result = await Order.find({ user: userId })
      .populate("shipping_address") // Populate nếu đây là mối quan hệ với collection khác
      .populate("payment_method") // Populate nếu đây là mối quan hệ với collection khác
      .populate("user"); // Populate user nếu cần
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteOrderServices = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const orderResult = await Order.deleteOne({ _id: id }).session(session);
    if (orderResult.deletedCount === 0) {
      await session.abortTransaction();
      session.endSession();
      return null;
    }

    const detailResult = await Order_details.deleteMany({
      order: id,
    }).session(session);
    const addressResult = await Shipping_address.deleteMany({
      order: id,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      orderDeleted: orderResult.deletedCount,
      detailsDeleted: detailResult.deletedCount,
      addressesDeleted: addressResult.deletedCount,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error);
    return null;
  }
};
module.exports = {
  postOrderServices,
  getALLOrderServices,
  putUpdateOrderServices,
  getOrderByUserIdAPIServices,
  deleteOrderServices,
};
