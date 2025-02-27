const { postShipping_addressServices,getShipping_addressServices } = require("../services/shipping_addressServices");

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
    let result = await getShipping_addressServices(req.query);
  
    return res.status(200).json({
      length: result.length,
      errorCode: 0,
      data: result,
    });
  };

module.exports = {
    postShipping_addressAPI,getShipping_addressAPI
};

