const payment_method = require("../models/payment_method");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postPayment_methodAPI_Services = async (data) => {
  try {
    let result = await payment_method.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { postPayment_methodAPI_Services };
