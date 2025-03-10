const Joi = require("joi");

// Schema tạo User (Không cần ID)
const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  full_name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Tên phải có ít nhất 3 ký tự",
    "string.max": "Tên không được vượt quá 30 ký tự",
    "any.required": "Tên là bắt buộc",
  }),
  address: Joi.string().messages({
    "any.required": "Địa chỉ là bắt buộc",
  }),
  phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).messages({
    "string.empty": "Số điện thoại không được để trống",
    "string.pattern.base": "Số điện thoại phải có đúng 10 chữ số",
    "any.required": "Số điện thoại là bắt buộc",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-zA-Z0-9]{0,10}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bắt đầu bằng chữ in hoa và tối đa 10 ký tự",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  role: Joi.string(),
});

// Schema cập nhật User (Cần ID)
const updateUserSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "string.empty": "ID người dùng không được để trống",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  full_name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Tên phải có ít nhất 3 ký tự",
    "string.max": "Tên không được vượt quá 30 ký tự",
    "any.required": "Tên là bắt buộc",
  }),
  address: Joi.string().required().messages({
    "any.required": "Địa chỉ là bắt buộc",
  }),
  phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required().messages({
    "string.empty": "Số điện thoại không được để trống",
    "string.pattern.base": "Số điện thoại phải có đúng 10 chữ số",
    "any.required": "Số điện thoại là bắt buộc",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-zA-Z0-9]{0,10}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bắt đầu bằng chữ in hoa và tối đa 10 ký tự",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  role: Joi.string(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
