const Carts = require("../models/carts");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");

const postCartsServices = async (data) => {
    try {
        let result = await Carts.create(data);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { postCartsServices };
