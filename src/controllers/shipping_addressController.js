const { postShipping_addressServices } = require("../services/shipping_addressServices");

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

module.exports = {
    postShipping_addressAPI,
};

