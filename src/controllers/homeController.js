const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const checkABC = (req, res) => {
  return res.render("samples.ejs");
};
module.exports = { checkABC };
