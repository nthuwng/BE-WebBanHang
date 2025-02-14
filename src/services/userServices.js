const User = require("../models/user");
const aqp = require("api-query-params");

module.exports = {
    getALLUser: async (queryString) => {
    const page = queryString.page;
    const { filter, limit } = aqp(queryString);
    delete filter.page;

    let offset = (page - 1) * limit;
    let result = User.find(filter)
    //   .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
};
