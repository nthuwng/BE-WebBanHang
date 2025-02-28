const {
  postShipping_addressServices,
  getALLShipping_addressServices,
  putUpdateShipping_addressServices,
  getShipping_addressByIdServices,
  deleteShipping_addressServices,
} = require("../services/Shipping_addressServices");

const postShipping_addressAPI = async (req, res) => {
  try {
    let result = await postShipping_addressServices(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getShipping_addressAPI = async (req, res) => {
  let result = await getALLShipping_addressServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const updateShipping_addressAPI = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await putUpdateShipping_addressServices(id, req.body);

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

const getShipping_addressByIdAPI = async (req, res) => {
  let id = req.params.id;
  let result = await getShipping_addressByIdServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteShipping_addressAPI = async (req, res) => {
  let id = req.params.id;
  let result = await deleteShipping_addressServices(id);
  if (!result) {
    return res.status(404).json({ errorCode: 1 });
  }
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postShipping_addressAPI,
  getShipping_addressAPI,
  updateShipping_addressAPI,
  getShipping_addressByIdAPI,
  deleteShipping_addressAPI,
};
