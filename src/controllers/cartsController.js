const { postCartsServices,getCartsServices } = require("../services/cartsServices");

const postCartsAPI = async (req, res) => {
  try {
    let result = await postCartsServices(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getCartsAPI = async (req, res) => {
  let result = await getCartsServices(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  postCartsAPI,
  getCartsAPI,
};
