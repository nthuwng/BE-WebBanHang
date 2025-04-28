const {
  postOrder_detailsServices,
  getALLOrder_detailsServices,
  putUpdateOrder_detailsServices,
  getOrder_detailsByIdServices,
  deleteOrder_detailsServices,
} = require("../services/order_detailsServices");

const postOrder_detailsAPI = async (req, res) => {
  try {
    let result = await postOrder_detailsServices(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getOrder_detailsAPI = async (req, res) => {
  let result = await getALLOrder_detailsServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const updateOrder_detailsAPI = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await putUpdateOrder_detailsServices(id, req.body);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getOrder_detailsByOrderAPI = async (req, res) => {
  try {
    let orderId = req.params.id;

    let result = await getOrder_detailsByIdServices(orderId);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({
      errorCode: 1,
      message: "Lỗi khi lấy chi tiết đơn hàng",
    });
  }
};

const deleteOrder_detailsAPI = async (req, res) => {
  let id = req.params.id;
  let result = await deleteOrder_detailsServices(id);
  if (!result) {
    return res.status(404).json({ errorCode: 1 });
  }
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postOrder_detailsAPI,
  getOrder_detailsAPI,
  updateOrder_detailsAPI,
  getOrder_detailsByOrderAPI,
  deleteOrder_detailsAPI,
};
