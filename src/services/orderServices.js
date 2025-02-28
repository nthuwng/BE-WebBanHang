const Order = require("../models/order");
const aqp = require("api-query-params");

const postOrderServices = async (data) => {
  try {
    let result = await Order.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
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

const getOrderByIdServices = async (id) => {
  try {
    let result = Order.findById(id);
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
  getOrderByIdServices,
  deleteOrderServices,
};
