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

const getCartsServices = async (queryString) => {
    const page = queryString.page;
    const { filter, limit ,population} = aqp(queryString);
    delete filter.page;
  
    let offset = (page - 1) * limit;
    let result = Carts.find(filter)
        .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  };
  

module.exports = { postCartsServices,getCartsServices };
