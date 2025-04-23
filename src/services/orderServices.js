const Order_details = require("../models/Order_details");
const Order = require("../models/order");
const Shipping_address = require("../models/Shipping_address");
const aqp = require("api-query-params");

const postOrderServices = async (
  userID, // userID truyền từ frontend
  payment_method_id,
  total_price,
  products,
  shipping_address,
  email,
  phone
) => {
  try {
    // Kiểm tra xem userID có tồn tại không
    if (!userID) {
      throw new Error("User is not authenticated");
    }
    // Tạo đơn hàng
    const newOrderData = {
      user: userID, // Lấy userID thay vì req.user.id
      payment_method: payment_method_id,
      total_price,
      status: "pending", // Trạng thái đơn hàng mặc định
    };

    const savedOrder = await Order.create(newOrderData); // Lưu đơn hàng vào cơ sở dữ liệu

    // Tạo chi tiết đơn hàng cho từng sản phẩm trong giỏ hàng
    const orderDetails = products.map((product) => ({
      order: savedOrder._id, // ID đơn hàng đã lưu
      product: product.id, // ID sản phẩm
      quantity: product.quantity, // Số lượng sản phẩm
      price: product.price, // Giá của sản phẩm
    }));
    await Order_details.insertMany(orderDetails); // Lưu chi tiết đơn hàng vào cơ sở dữ liệu

    // Tạo địa chỉ giao hàng
    const shippingAddressData = {
      user: userID,
      order: savedOrder._id,
      address: shipping_address,
      email,
      phone,
    };
    await Shipping_address.create(shippingAddressData); // Lưu địa chỉ giao hàng

    // Trả về thông tin đơn hàng đã tạo
    return savedOrder; // Trả về đơn hàng đã lưu
  } catch (error) {
    console.error(error);
    throw new Error("Error creating order: " + error.message); // Throw error để xử lý ở controller
  }
};

const getALLOrderServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Order.find(filter)
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
  try {
    let result = await Order.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!result) {
      return null; // Nếu không tìm thấy sản phẩm, trả về null
    } else return result;
  } catch (error) {
    console.log(error);
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
