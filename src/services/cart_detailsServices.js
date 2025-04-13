const { default: mongoose } = require("mongoose");
const Cart_details = require("../models/Cart_details");
const Cart = require("../models/Carts");
const Product = require("../models/product");
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

  // Kiểm tra xem userId có hợp lệ không
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    console.log("User ID không hợp lệ:", userId);
    return [];
  }

  // Tìm người dùng theo userId
  const user = await User.findById(userId);
  if (!user) {
    console.log("Không có người dùng với userId:", userId);
    return [];
  } else {
    // Tìm tất cả các giỏ hàng của người dùng
    const carts = await Cart.find({ user: userId });

    if (carts.length === 0) {
      console.log("Không có giỏ hàng nào cho người dùng");
      return [];
    }

    // Lấy các CartDetail liên quan đến tất cả các giỏ hàng của người dùng
    const cartDetails = await Cart_details.find({
      cart: { $in: carts.map((cart) => cart._id) },
    })
      .populate("product")
      .exec();

    return cartDetails;
  }
};

const putUpdateCart_detailsServices = async (id, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    const cartdetail = await Cart_details.findById(id);
    if (!cartdetail) {
      throw new Error("Không có sản phẩm nào trong giỏ hàng");
    }

    // Tính toán giá mới nếu có thay đổi số lượng
    if (quantity > 0) {
      cartdetail.price = product.price * quantity;
      cartdetail.quantity = quantity;
    }

    // Cập nhật giỏ hàng với giá mới
    let result = await Cart_details.findByIdAndUpdate(id, cartdetail, {
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

const deleteCart_detailsServices = async (id, userId) => {
  try {
    const cartDetail = await Cart_details.findById(id);
    if (!cartDetail) return null;

    const cartId = cartDetail.cart;

    const cart = await Cart.findOne({ _id: cartId, user: userId });
    if (!cart) {
      console.warn("Cart not found for user");
      return null;
    }

    await Cart_details.deleteOne({ _id: id });

    const allDetails = await Cart_details.find({ cart: cart._id });

    cart.sum = allDetails.length;

    const updatedCart = await cart.save();
    return { success: true, cart: updatedCart };
  } catch (error) {
    console.error("Error in deleteCart_detailsServices:", error);
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
