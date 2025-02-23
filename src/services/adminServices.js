const Admin = require("../models/admin");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postCreateAdmin = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    let result = await Admin.create({ ...data, password: hashPassword });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getALLAdmin = async (queryString) => {
  const page = queryString.page;
  const { filter, limit } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Admin.find(filter)
    //   .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateAdminServices = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);

    let result = await Admin.updateOne(
      { _id: data.id },
      { ...data, password: hashPassword }
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteAdminServices = async (data) => {
  try {
    let result = await Admin.deleteById(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const uploadFileAvatar = async (adminId, file) => {
  try {
    // Kiểm tra admin có tồn tại không
    const admin = await Admin.findById(adminId);
    if (!admin) {
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
    let uploadPath = path.resolve(__dirname, "../public/images/avatar/admin");
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

    // Cập nhật avatar cho admin
    admin.avatar = `/images/avatar/admin/${finalName}`;
    await admin.save();

    return {
      status: "success",
      message: "Cập nhật avatar thành công!",
      avatar: admin.avatar,
    };
  } catch (error) {
    console.error("Lỗi upload avatar:", error);
    return { status: "failed", message: "Lỗi hệ thống" };
  }
};
const loginAdminServices = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      const checkPassword = await bcrypt.compare(password, admin.password);
      if (!checkPassword) {
        return {
          Error: 2,
          ErrorMessage: "Password không đúng",
        };
      } else {
        const payload = {
          email: email,
          name: admin.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          access_token,
          admin: {
            email: admin.email,
            name: admin.name,
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
module.exports = {
  postCreateAdmin,
  getALLAdmin,
  putUpdateAdminServices,
  deleteAdminServices,
  uploadFileAvatar,
  loginAdminServices,
};
