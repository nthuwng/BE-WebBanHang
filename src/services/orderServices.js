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

module.exports = { postCreateOrderServices };
