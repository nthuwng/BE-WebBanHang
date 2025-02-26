const Cart_details = require("../models/cart_details");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postCart_detailsServices = async (data) => {
    try {
        let result = await Cart_details.create(data);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { postCart_detailsServices };
