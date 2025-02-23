const {
  getALLAdmin,
  putUpdateAdminServices,
  deleteAdminServices,
  postCreateAdmin,
  uploadFileAvatar,
  loginAdminServices,
} = require("../services/adminServices");
const {
  createAdminSchema,
  updateAdminSchema,
} = require("../validation/admin.validation");

const postCreateAdminAPI = async (req, res) => {
  try {
    let { error } = createAdminSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        msg: error.details.map((err) => err.message),
      });
    }
    let result = await postCreateAdmin(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getALLAdminAPI = async (req, res) => {
  let result = await getALLAdmin(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const putUpdateAdminAPI = async (req, res) => {
  try {
    let { error } = updateAdminSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        msg: error.details.map((err) => err.message),
      });
    }
    let result = await putUpdateAdminServices(req.body);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const deleteAdminAPI = async (req, res) => {
  let id = req.body.id;
  let result = await deleteAdminServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const addAvatarAPI = async (req, res) => {
  try {
    const adminId = req.query.id;
    const file = req.files?.avatar;

    const result = await uploadFileAvatar(adminId, file);

    return res.status(result.status === "success" ? 200 : 400).json(result);
  } catch (error) {
    console.error("Lỗi API upload avatar:", error);
    return res.status(500).json({ status: "failed", message: "Lỗi hệ thống" });
  }
};

const loginAdminAPI = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginAdminServices(email, password);

  return res.status(200).json({ data: result });
};
module.exports = {
  postCreateAdminAPI,
  getALLAdminAPI,
  putUpdateAdminAPI,
  deleteAdminAPI,
  addAvatarAPI,
  loginAdminAPI
};
