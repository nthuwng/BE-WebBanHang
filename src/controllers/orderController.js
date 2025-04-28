const {
  postOrderServices,
  getALLOrderServices,
  putUpdateOrderServices,
  getOrderByUserIdAPIServices,
  deleteOrderServices,
} = require("../services/orderServices");

const postOrderAPI = async (req, res) => {
  try {
    const {
      userID,
      payment_method_id,
      total_price,
      products,
      shipping_address,
      email,
      phone,
    } = req.body;
    let result = await postOrderServices(
      userID,
      payment_method_id,
      total_price,
      products,
      shipping_address,
      email,
      phone
    );
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getOrderAPI = async (req, res) => {
  let result = await getALLOrderServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const getOrderByUserIdAPI = async (req, res) => {
  let userId = req.params.id;
  let result = await getOrderByUserIdAPIServices(userId);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const updateOrderAPI = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await putUpdateOrderServices(id, req.body);

    return res.status(200).json({
      errorCode: 0,
      msg: "Cập nhật đơn hàng thành công",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const deleteOrderAPI = async (req, res) => {
  let id = req.params.id;
  let result = await deleteOrderServices(id);
  if (!result) {
    return res
      .status(404)
      .json({ errorCode: 1, msg: "Đơn hàng không tồn tại" });
  }
  return res.status(200).json({
    errorCode: 0,
    msg: "Đơn hàng đã được xóa thành công",
    data: result,
  });
};

module.exports = {
  postOrderAPI,
  getOrderAPI,
  updateOrderAPI,
  getOrderByUserIdAPI,
  deleteOrderAPI,
};
