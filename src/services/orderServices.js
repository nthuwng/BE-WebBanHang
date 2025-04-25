const mongoose = require("mongoose");
const Order_details = require("../models/Order_details");
const Order = require("../models/order");
const Shipping_address = require("../models/Shipping_address");
const aqp = require("api-query-params");

const postOrderServices = async (
  userID,
  payment_method_id,
  total_price,
  products,
  shipping_address, // địa chỉ
  email,
  phone
) => {
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

    const savedOrder = await Order.create(newOrderData);

    // ✅ Bước 2: Tạo shipping address, gán order._id vào
    const shippingAddressDoc = await Shipping_address.create({
      user: userID,
      order: savedOrder._id, // 👈 giờ mới có giá trị
      address: shipping_address,
      email,
      phone,
    });

    // ✅ Bước 3: Gán shipping_address._id ngược lại vào Order
    savedOrder.shipping_address = shippingAddressDoc._id;
    await savedOrder.save();

    // ✅ Bước 4: Tạo chi tiết đơn hàng
    const orderDetails = products.map((product) => ({
      order: savedOrder._id,
      product: product.id,
      quantity: product.quantity,
      price: product.price,
    }));
    await Order_details.insertMany(orderDetails);

    return savedOrder;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating order: " + error.message);
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
    let result = Order.find({ user: userId });
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
