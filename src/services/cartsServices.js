const Cart = require("../models/Carts");
const User = require("../models/user");
const Product = require("../models/product");
const CartDetail = require("../models/Cart_details");

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
const handleAddProductToCart = async (userId, productId, quantity) => {
  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Kiểm tra giỏ hàng của người dùng
    let cart = await Cart.findOne({ user: userId, status: "active" }).populate(
      "cartDetails"
    );

    if (!cart) {
      // Nếu người dùng chưa có giỏ hàng, tạo mới giỏ hàng
      cart = new Cart({
        user: userId,
        total_price: 0,
        sum: 0,
        cartDetails: [],
      });
      await cart.save();

      // Gán giỏ hàng vào người dùng
      user.cart = cart._id;
      await user.save();
    }

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let cartDetail = await CartDetail.findOne({
      cart: cart._id,
      product: productId,
    });

    if (!cartDetail) {
      // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới vào giỏ hàng
      cartDetail = new CartDetail({
        cart: cart._id,
        product: productId,
        quantity: quantity,
        price: product.price,
      });
      await cartDetail.save();

      // Thêm chi tiết sản phẩm vào giỏ hàng
      cart.cartDetails.push(cartDetail._id);
      cart.sum = (cart.sum || 0) + 1; // Đảm bảo sum là một số hợp lệ
      cart.total_price =
        (cart.total_price || 0) + product.price * Number(quantity); // Cập nhật tổng giá trị giỏ hàng
    } else {
      // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
      cartDetail.quantity = (cartDetail.quantity || 0) + Number(quantity);
      await cartDetail.save();

      // Cập nhật lại tổng số lượng và tổng giá trị giỏ hàng
      cart.sum = cart.cartDetails.length; // Cập nhật lại tổng số sản phẩm trong giỏ hàng
      cart.total_price = 0; // Reset tổng giá trị giỏ hàng

      // Duyệt qua các cartDetail và tính lại tổng giá trị
      for (let i = 0; i < cart.cartDetails.length; i++) {
        const detail = await CartDetail.findById(cart.cartDetails[i]);
        if (detail) {
          cart.total_price += detail.quantity * detail.price;
        }
      }
    }

    // Lưu giỏ hàng sau khi cập nhật
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
