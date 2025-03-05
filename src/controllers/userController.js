const {
  getALLUser,
  putUpdateUserServices,
  deleteUserServices,
  postCreateUser,
  uploadFileAvatar,
  loginUserServices,
  registerAPI,
} = require("../services/userServices");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validation/user.validation");
const postCreateUserAPI = async (req, res) => {
  try {
    let { error } = createUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        msg: error.details.map((err) => err.message),
      });
    }
    let result = await postCreateUser(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const getALLUserAPI = async (req, res) => {
  let result = await getALLUser(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const putUpdateUserAPI = async (req, res) => {
  try {
    let { error } = updateUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        msg: error.details.map((err) => err.message),
      });
    }
    let result = await putUpdateUserServices(req.body);

    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.id;
  let result = await deleteUserServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const addAvatarAPI = async (req, res) => {
  try {
    const userId = req.query.id;
    const file = req.files?.avatar;

    const result = await uploadFileAvatar(userId, file);

    return res.status(result.status === "success" ? 200 : 400).json(result);
  } catch (error) {
    console.error("Lỗi API upload avatar:", error);
    return res.status(500).json({ status: "failed", message: "Lỗi hệ thống" });
  }
};

const loginUserAPI = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUserServices(email, password);

  return res.status(200).json({ data: result });
};

const registerUserAPI = async (req, res) => {
  try {
    let { error } = createUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        msg: error.details.map((err) => err.message),
      });
    }

    let result = await registerAPI(req.body);
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorCode: 1, msg: "Lỗi server" });
  }
};
module.exports = {
  postCreateUserAPI,
  getALLUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  addAvatarAPI,
  loginUserAPI,
  registerUserAPI,
};
