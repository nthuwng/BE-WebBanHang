const User = require("../models/user");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const role = require("../models/role");

const postCreateUser = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    let result = await User.create({ ...data, password: hashPassword });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getALLUser = async (queryString) => {
  const page = queryString.page;
  const { filter, limit } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = User.find(filter)
    //   .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateUserServices = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    let result = await User.updateOne(
      { _id: data.id },
      { ...data, password: hashPassword }
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteUserServices = async (data) => {
  try {
    let result = await User.deleteById(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const uploadFileAvatar = async (userId, file) => {
  try {
    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return { status: "failed", message: "Không tìm thấy người dùng" };
    }

    // Kiểm tra file
    if (!file) {
      return { status: "failed", message: "Không có file nào được tải lên" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return {
        status: "failed",
        message: "Chỉ chấp nhận file .jpg, .png, .gif",
      };
    }

    // Kiểm tra kích thước file (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        status: "failed",
        message: "Dung lượng file không được vượt quá 5MB",
      };
    }

    // Đường dẫn lưu avatar
    let uploadPath = path.resolve(__dirname, "../public/images/avatar");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tạo tên file mới
    let extName = path.extname(file.name);
    let baseName = path.basename(file.name, extName);
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    // Lưu file vào thư mục
    await file.mv(finalPath);

    // Cập nhật avatar cho user
    user.avatar = `/images/avatar/user/${finalName}`;
    await user.save();

    return {
      status: "success",
      message: "Cập nhật avatar thành công!",
      avatar: user.avatar,
    };
  } catch (error) {
    console.error("Lỗi upload avatar:", error);
    return { status: "failed", message: "Lỗi hệ thống" };
  }
};

const loginUserServices = async (email, password) => {
  try {
    const user = await User.findOne({ email: email }).populate('role');
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return {
          Error: 2,
          ErrorMessage: "Password không đúng",
        };
      } else {
        const payload = {
          email: email,
          name: user.name,
          role: user.role.name, // Lấy tên role (chứ không phải ObjectId)
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          access_token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role.name, // Trả về role là tên role
          },
        };
      }
    } else {
      return {
        Error: 1,
        ErrorMessage: "Email không tồn tại",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const registerAPI = async(data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const clientRole = await role.findOne({ name: "client" });
    let result = await User.create({ ...data, password: hashPassword,role:clientRole._id });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


module.exports = {
  postCreateUser,
  getALLUser,
  putUpdateUserServices,
  deleteUserServices,
  uploadFileAvatar,
  loginUserServices,registerAPI
};
