const express = require("express");
const router = express.Router();
const {
  checkABC,
  postCreateUserAPI,
} = require("../controllers/homeController");

router.get("/abcd", checkABC);
router.post("/user", postCreateUserAPI);

module.exports = router;
