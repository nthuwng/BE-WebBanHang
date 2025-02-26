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

module.exports = { postOrder_detailsServices };
