const Shipping_address = require("../models/shipping_address");
const aqp = require("api-query-params");
const path = require("path"); //fs : file systemconst fs = require("fs");
const bcrypt = require("bcrypt");

const postShipping_addressServices = async (data) => {
  try {
    let result = await Shipping_address.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getShipping_addressServices = async (queryString) => {
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

module.exports = { postShipping_addressServices, getShipping_addressServices };
