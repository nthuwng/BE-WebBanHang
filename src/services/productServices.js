const Product = require("../models/product");
const aqp = require("api-query-params");
const path = require("path"); //fs : file system
const fs = require("fs");


const postProductServices = async (data) => {
  try {
    let result = await Product.create(data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getALLProductServices = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;

  let offset = (page - 1) * limit;
  let result = Product.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

const putUpdateProductServices = async (id, data) => {
  try {
    let result = await Product.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductByIdServices = async (id) => {
  try {
    let result = Product.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteProductServices = async (id) => {
  try {
    let result = await Product.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!result) {
      return null; // Nếu không tìm thấy sản phẩm, trả về null
    } else return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadFileProduct = async (productId, file) => {
  try {
    // Kiểm tra product có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
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

    // Đường dẫn lưu image
    let uploadPath = path.resolve(__dirname, "../public/images/products");
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

    // Cập nhật image cho product
    product.image = `/images/products/${finalName}`;
    await product.save();

    return {
      status: "success",
      message: "Cập nhật image thành công!",
      image: product.image,
    };
  } catch (error) {
    console.error("Lỗi upload image:", error);
    return { status: "failed", message: "Lỗi hệ thống" };
  }
};

module.exports = {
  postProductServices,
  getALLProductServices,
  putUpdateProductServices,
  getProductByIdServices,
  deleteProductServices,
  uploadFileProduct,
};
