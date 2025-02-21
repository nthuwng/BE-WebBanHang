const Admin = require("../models/admin");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");

const postCreateAdmin = async (data) => {
  try {
    let result = await Admin.create(data);
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
    let result = await Admin.updateOne({ _id: data.id }, { ...data });
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
module.exports = {
  postCreateAdmin,
  getALLAdmin,
  putUpdateAdminServices,
  deleteAdminServices,
  uploadFileAvatar,
};
