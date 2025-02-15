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

  putUpdateUserServices: async (data) => {
    try {
      let result = await User.updateOne({ _id: data.id }, { ...data });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteUserServices: async (data) => {
    try {
      let result = await User.deleteById(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
