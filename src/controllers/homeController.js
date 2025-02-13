const path = require("path");
const express = require("express");
const app = express();
const User = require("../models/user");

app.use(express.static(path.join(__dirname, "../public")));

const checkABC = (req, res) => {
  return res.render("samples.ejs");
};
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
module.exports = { checkABC, postCreateUserAPI };
