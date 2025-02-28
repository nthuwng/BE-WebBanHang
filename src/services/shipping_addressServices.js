const Shipping_address = require("../models/Shipping_address");
const aqp = require("api-query-params");

const postShipping_addressServices = async (data) => {
  try {
    let result = await Shipping_address.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLShipping_addressServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Shipping_address.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateShipping_addressServices = async (id, data) => {
  try {
    let result = await Shipping_address.updateOne({ _id: id }, { ...data });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getShipping_addressByIdServices = async (id) => {
  try {
    let result = Shipping_address.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteShipping_addressServices = async (id) => {
  try {
    let result = await Shipping_address.deleteById({ _id: id });
    if (!result) {
      return null; // Nếu không tìm thấy sản phẩm, trả về null
    } else return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  postShipping_addressServices,
  getALLShipping_addressServices,
  putUpdateShipping_addressServices,
  getShipping_addressByIdServices,
  deleteShipping_addressServices,
};
