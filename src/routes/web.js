const express = require("express");
const router = express.Router();
const {
  postCreateUserAPI,
  getALLUserAPI,
} = require("../controllers/homeController");

router.post("/user", postCreateUserAPI);
router.get("/user", getALLUserAPI);

module.exports = router;
