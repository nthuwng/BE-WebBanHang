const express = require("express");
const router = express.Router();
const { checkABC } = require("../controllers/homeController");

router.get("/abcd", checkABC);

module.exports = router;
