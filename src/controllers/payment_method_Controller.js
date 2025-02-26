const {
  postPayment_methodAPI_Services,
} = require("../services/payment_method_Services");

const postPayment_methodAPI = async (req, res) => {
  try {
    let result = await postPayment_methodAPI_Services(req.body);
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
  postPayment_methodAPI,
};
