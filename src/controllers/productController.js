const {
  postProductServices,
  getALLProductServices,
  putUpdateProductServices,
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
    let result = await putUpdateProductServices(req.body);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

module.exports = {
  postProductAPI,
  getProductAPI,
  updateProductAPI,
};
