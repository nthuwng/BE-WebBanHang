const express = require("express");
const router = express.Router();
const {
    postCart_detailsAPI
} = require("../controllers/cart_detailsController");

router.post("/createCart_details", postCart_detailsAPI);

module.exports = router;
