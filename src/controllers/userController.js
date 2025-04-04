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
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
const getUserFromToken = (token) => {
  try {
    // Kiểm tra xem token có hợp lệ không
    if (!token) {
      throw new Error("Token không được cung cấp");
    }

    // Tách "Bearer" ra khỏi token (nếu có)
    const tokenWithoutBearer = token.split(" ")[1];

    // Giải mã token với secret key
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET); // JWT_SECRET từ env

    // Trả về thông tin người dùng giải mã được
    return decoded; // Thông tin người dùng sẽ có trong payload của token
  } catch (error) {
    throw new Error("Token không hợp lệ hoặc hết hạn");
  }
};

const getAccountAPI = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    const decoded = getUserFromToken(token);

    const email = decoded.email;

    const user = await User.findOne({ email })
      .populate("role")
      .populate("cart");

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    return res.status(200).json({
      errorCode: 0,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Trả lại thông báo lỗi từ hàm getUserFromToken
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
  getAccountAPI,
};
