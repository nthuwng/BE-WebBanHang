const Product = require("../models/product");
const aqp = require("api-query-params");

const postProductServices = async (data) => {
  try {
    let result = await Product.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLProductServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Product.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateProductServices = async (id, data) => {
  try {
    let result = await Product.findByIdAndUpdate(id, data, { new: true }).exec();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductByIdServices = async (id) => {
  try {
    let result = Product.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteProductServices = async (id) => {
  try {
    let result = await Product.findByIdAndUpdate(id,{ deleted: true },{ new: true });
    if (!result) {
      return null; // Nếu không tìm thấy sản phẩm, trả về null
    } else return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  postProductServices,
  getALLProductServices,
  putUpdateProductServices,
  getProductByIdServices,
  deleteProductServices,
};
