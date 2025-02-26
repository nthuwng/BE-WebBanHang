const { postCategoryServices } = require("../services/categoryServices");

const postCategoryAPI = async (req, res) => {
  try {
    let result = await postCategoryServices(req.body);
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
  postCategoryAPI,
};

