const { postProductServices } = require("../services/productServices");

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

module.exports = {
    postProductAPI,
};

