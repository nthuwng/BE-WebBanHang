const Order_details = require("../models/Order_details");
const aqp = require("api-query-params");

const postOrder_detailsServices = async (data) => {
  try {
    let result = await Order_details.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLOrder_detailsServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Order_details.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateOrder_detailsServices = async (id, data) => {
  try {
    let result = await Order_details.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrder_detailsByIdServices = async (orderId) => {
  try {
    if (!orderId) {
      console.log("Order ID is missing or invalid");
      return null;
    }

    let result = await Order_details.find({ order: orderId }).populate(
      "product"
    );

    if (!result || result.length === 0) {
      console.log("No order details found for ID:", orderId);
    }

    return result;
  } catch (error) {
    console.error("Error in service:", error);
    return null;
  }
};
const deleteOrder_detailsServices = async (id) => {
  try {
    let result = await Order_details.findByIdAndUpdate(
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
  postOrder_detailsServices,
  getALLOrder_detailsServices,
  putUpdateOrder_detailsServices,
  getOrder_detailsByIdServices,
  deleteOrder_detailsServices,
};
