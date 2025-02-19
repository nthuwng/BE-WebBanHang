const User = require("../models/user");
const aqp = require("api-query-params");
const Joi = require("joi");

//Validation data
const schema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "string.empty": "ID người dùng không được để trống",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Tên phải có ít nhất 3 ký tự",
    "string.max": "Tên không được vượt quá 30 ký tự",
    "any.required": "Tên là bắt buộc",
  }),
  city: Joi.string().required().messages({
    "any.required": "Thành phố là bắt buộc",
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
});

const validateUser = (data) => {
  return schema.validate(data, { abortEarly: false });
};

const postCreateUser = async (data) => {
  try {
    let { error } = validateUser(data);
    if (error) {
      return { errorCode: 1, msg: error.details.map((err) => err.message) };
    } else {
      let result = await User.create(data);
      return result;
    }
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
    let { error } = validateUser(data);
    if (error) {
      return { errorCode: 1, msg: error.details.map((err) => err.message) };
    } else {
      let result = await User.updateOne({ _id: data.id }, { ...data });
      return result;
    }
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
module.exports = {
  postCreateUser,
  getALLUser,
  putUpdateUserServices,
  deleteUserServices,
};
