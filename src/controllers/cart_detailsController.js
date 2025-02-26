const { postCart_detailsServices } = require("../services/cart_detailsServices");

const postCart_detailsAPI = async (req, res) => {
    try {
        let result = await postCart_detailsServices(req.body);
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
    postCart_detailsAPI,
};

