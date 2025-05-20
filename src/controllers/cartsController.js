const {
  postCartServices,
  getALLCartServices,
  putUpdateCartServices,
  getCartByIdServices,
  deleteCartServices,
  handleAddProductToCart,
  getCartByUserIDServices,
} = require("../services/cartsServices");

const postCartAPI = async (req, res) => {
  try {
    let result = await postCartServices(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const postAddProductToCart = async (req, res) => {
  const { userID, productID, quantity } = req.body;
  const result = await handleAddProductToCart(userID, productID, quantity);
  if (result) {
    return res.status(200).json({ success: true, cart: result });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Error adding product to cart" });
  }
};

const getCartAPI = async (req, res) => {
  let result = await getALLCartServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};
const getCartByUserID = async (req, res) => {
  let userID = req.params.id;
  let result = await getCartByUserIDServices(userID);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const updateCartAPI = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await putUpdateCartServices(id, req.body);

    return res.status(200).json({
      errorCode: 0,
      msg: "Cập nhật giỏ hàng thành công",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getCartByIdAPI = async (req, res) => {
  let id = req.params.id;
  let result = await getCartByIdServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteCartAPI = async (req, res) => {
  let id = req.params.id;
  let result = await deleteCartServices(id);
  if (!result) {
    return res
      .status(404)
      .json({ errorCode: 1, msg: "Giỏ hàng không tồn tại" });
  }
  return res.status(200).json({
    errorCode: 0,
    msg: "Giỏ hàng đã được xóa thành công",
    data: result,
  });
};

module.exports = {
  postCartAPI,
  getCartAPI,
  updateCartAPI,
  getCartByIdAPI,
  deleteCartAPI,
  postAddProductToCart,
  getCartByUserID,
};
