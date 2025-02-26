const express = require("express");
const router = express.Router();
const {
    postOrderAPI
} = require("../controllers/orderController");

router.post("/createOrder", postOrderAPI);

module.exports = router;
