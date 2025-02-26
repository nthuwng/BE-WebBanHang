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

module.exports = { postProductServices };
