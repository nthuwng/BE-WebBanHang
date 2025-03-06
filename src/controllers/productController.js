const {
  postProductServices,
  getALLProductServices,
  putUpdateProductServices,
  getProductByIdServices,
  deleteProductServices,
  uploadFileProduct,
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

const addImageProductAPI = async (req, res) => {
  try {
    const productId = req.query.id;
    const file = req.files?.image;

    const result = await uploadFileProduct(productId, file);

    return res.status(result.status === "success" ? 200 : 400).json(result);
  } catch (error) {
    console.error("Lỗi API upload ảnh product:", error);
    return res.status(500).json({ status: "failed", message: "Lỗi hệ thống" });
  }
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
  addImageProductAPI,
  getProductByIdAPI,
  deleteProductAPI,
};
