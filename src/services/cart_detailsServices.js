const Cart_details = require("../models/Cart_details");
const Cart = require("../models/Carts");
const User = require("../models/user");

const aqp = require("api-query-params");

const postCart_detailsServices = async (data) => {
  try {
    let result = await Cart_details.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLCart_detailsServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Cart_details.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const getCart_details_ByUserIdServices = async (queryString) => {
  const userId = queryString.userId;

  // Tìm người dùng theo userId
  const user = await User.findById(userId);
  if (!user) {
    console.log("Không có người dùng với userId:", userId);
    return [];
  } else {
    const carts = await Cart.find({ user: userId });

    if (carts.length === 0) {
      console.log("Không có giỏ hàng nào cho người dùng");
      return [];
    }

    // Lấy các CartDetail liên quan đến tất cả các giỏ hàng của người dùng
    const cartDetails = await Cart_details.find({cart: carts})
      .populate("product")
      .exec();

    return cartDetails;
  }
};

const putUpdateCart_detailsServices = async (id, data) => {
  try {
    let result = await Cart_details.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCart_detailsByIdServices = async (id) => {
  try {
    let result = Cart_details.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCart_detailsServices = async (id) => {
  try {
    let result = await Cart_details.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!result) {
      return null; // Nếu không tìm thấy sản phẩm, trả về null
    } else return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  postCart_detailsServices,
  getALLCart_detailsServices,
  putUpdateCart_detailsServices,
  getCart_detailsByIdServices,
  deleteCart_detailsServices,
  getCart_details_ByUserIdServices,
};
