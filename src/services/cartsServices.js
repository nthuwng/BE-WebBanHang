const Cart = require("../models/Carts");
const aqp = require("api-query-params");

const postCartServices = async (data) => {
  try {
    let result = await Cart.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLCartServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Cart.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateCartServices = async (id, data) => {
  try {
    let result = await Cart.findByIdAndUpdate(id, data, { new: true }).exec();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCartByIdServices = async (id) => {
  try {
    let result = Cart.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCartServices = async (id) => {
  try {
    let result = await Cart.findByIdAndUpdate(
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
  postCartServices,
  getALLCartServices,
  putUpdateCartServices,
  getCartByIdServices,
  deleteCartServices,
};
