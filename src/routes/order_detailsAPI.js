const express = require("express");
const router = express.Router();
const {
    postOrder_detailsAPI
} = require("../controllers/Order_detailsController");

router.post("/createOrder_details", postOrder_detailsAPI);

module.exports = router;
