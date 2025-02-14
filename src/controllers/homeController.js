const path = require("path");
const express = require("express");
const app = express();
const User = require("../models/user");
const { getALLUser } = require("../services/userServices");
app.use(express.static(path.join(__dirname, "../public")));

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
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
module.exports = { postCreateUserAPI, getALLUserAPI };
