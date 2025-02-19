const path = require("path");
const express = require("express");
const app = express();
const User = require("../models/user");
const {
  getALLUser,
  putUpdateUserServices,
  deleteUserServices,
} = require("../services/userServices");
app.use(express.static(path.join(__dirname, "../public")));

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let phone = req.body.phone;
  let password = req.body.password;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
    phone: phone,
    password: password,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
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
  let result = await putUpdateUserServices(req.body);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.id;
  let result = await deleteUserServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
module.exports = {
  postCreateUserAPI,
  getALLUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
};
