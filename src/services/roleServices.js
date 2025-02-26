const Role = require("../models/role");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postCreateRole = async (data) => {
  try {
    let result = await Role.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { postCreateRole };
