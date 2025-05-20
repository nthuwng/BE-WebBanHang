const Cart = require("../models/carts");
const User = require("../models/user");
const Product = require("../models/product");
const CartDetail = require("../models/cart_details");

const aqp = require("api-query-params");

const postCartServices = async (data) => {
  try {
    let result = await Cart.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const handleAddProductToCart = async (userID, productID, quantity) => {
  try {
    // Tìm người dùng
    const user = await User.findById(userID);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Tìm giỏ hàng active
    let cart = await Cart.findOne({ user: userID, status: "active" });
    if (!cart) {
      cart = new Cart({
        user: userID,
        total_price: 0,
        sum: 0,
      });
      await cart.save();

      user.cart = cart._id;
      await user.save();
    }

    // Kiểm tra sản phẩm
    const product = await Product.findById(productID);
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    let cartDetail = await CartDetail.findOne({
      cart: cart._id,
      product: productID,
    });

    if (!cartDetail) {
      // Nếu chưa có, tạo mới
      cartDetail = new CartDetail({
        cart: cart._id,
        product: productID,
        quantity: Number(quantity),
        price: product.price,
      });
      await cartDetail.save();
    } else {
      // Nếu đã có, cập nhật số lượng
      cartDetail.quantity += Number(quantity);
      await cartDetail.save();
    }

    // Lấy toàn bộ chi tiết giỏ hàng để tính lại
    const allDetails = await CartDetail.find({ cart: cart._id });

    // Tổng số loại sản phẩm khác nhau
    cart.sum = allDetails.length;

    // Tổng tiền
    cart.total_price = allDetails.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const updatedCart = await cart.save();
    return { success: true, cart: updatedCart };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false, message: "Error adding product to cart" };
  }
};

const getALLCartServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Cart.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateCartServices = async (id, data) => {
  try {
    let result = await Cart.findByIdAndUpdate(id, data, { new: true }).exec();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCartByIdServices = async (id) => {
  try {
    let result = Cart.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCartByUserIDServices = async (userID) => {
  try {
    let result = Cart.findOne({ user: userID });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteCartServices = async (id) => {
  try {
    let result = await Cart.findByIdAndUpdate(
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
  postCartServices,
  getALLCartServices,
  putUpdateCartServices,
  getCartByIdServices,
  deleteCartServices,
  handleAddProductToCart,
  getCartByUserIDServices,
};
