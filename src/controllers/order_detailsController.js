const { postOrder_detailsServices ,getOrder_detailsServices} = require("../services/order_detailsServices");

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
    let result = await getOrder_detailsServices(req.query);
  
    return res.status(200).json({
      length: result.length,
      errorCode: 0,
      data: result,
    });
  };

module.exports = {
    postOrder_detailsAPI,getOrder_detailsAPI
};

