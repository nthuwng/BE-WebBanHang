const Product = require("../models/product");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

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

module.exports = { postProductServices, getALLProductServices };
