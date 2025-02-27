const Order = require("../models/order");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postCreateOrderServices = async (data) => {
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
  const { filter, limit ,population} = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Order.find(filter)
      .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};


module.exports = { postCreateOrderServices ,getALLOrderServices};
