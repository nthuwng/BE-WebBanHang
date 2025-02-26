const { postOrder_detailsServices } = require("../services/order_detailsServices");

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

module.exports = {
    postOrder_detailsAPI,
};

