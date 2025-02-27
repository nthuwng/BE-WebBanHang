const Order_details = require("../models/order_details");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postOrder_detailsServices = async (data) => {
  try {
    let result = await Order_details.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrder_detailsServices = async (queryString) => {
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

module.exports = { postOrder_detailsServices, getOrder_detailsServices };
