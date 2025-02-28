const {
  postProductServices,
  getALLProductServices,
  putUpdateProductServices,
  getProductByIdServices,
  deleteProductServices,
} = require("../services/productServices");

const postProductAPI = async (req, res) => {
  try {
    let result = await postProductServices(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getProductAPI = async (req, res) => {
  let result = await getALLProductServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const updateProductAPI = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await putUpdateProductServices(id, req.body);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getProductByIdAPI = async (req, res) => {
  let id = req.params.id;
  let result = await getProductByIdServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteProductAPI = async (req, res) => {
  let id = req.params.id;
  let result = await deleteProductServices(id);
  if (!result) {
    return res
      .status(404)
      .json({ errorCode: 1, msg: "Sản phẩm không tồn tại" });
  }
  return res.status(200).json({
    errorCode: 0,
    msg: "Sản phẩm đã được xóa thành công",
    data: result,
  });
};

module.exports = {
  postProductAPI,
  getProductAPI,
  updateProductAPI,
  getProductByIdAPI,
  deleteProductAPI,
};
