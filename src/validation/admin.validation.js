const Joi = require("joi");

// Schema tạo Admin (Không cần ID)
const createAdminSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Tên phải có ít nhất 3 ký tự",
    "string.max": "Tên không được vượt quá 30 ký tự",
    "any.required": "Tên là bắt buộc",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-zA-Z0-9]{0,10}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bắt đầu bằng chữ in hoa và tối đa 10 ký tự",
      "any.required": "Mật khẩu là bắt buộc",
    }),
});

// Schema cập nhật Admin (Cần ID)
const updateAdminSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "string.empty": "ID người dùng không được để trống",
  }),
  email: Joi.string().email().required().optional().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  name: Joi.string().min(3).max(30).required().optional().messages({
    "string.min": "Tên phải có ít nhất 3 ký tự",
    "string.max": "Tên không được vượt quá 30 ký tự",
    "any.required": "Tên là bắt buộc",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-zA-Z0-9]{0,10}$"))
    .required()
    .optional()
    .messages({
      "string.pattern.base":
        "Mật khẩu phải bắt đầu bằng chữ in hoa và tối đa 10 ký tự",
      "any.required": "Mật khẩu là bắt buộc",
    }),
});

module.exports = {
  createAdminSchema,
  updateAdminSchema,
};
