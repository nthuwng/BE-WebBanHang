const express = require("express");
const router = express.Router();
const {
    postShipping_addressAPI
} = require("../controllers/shipping_addressController");

router.post("/createShipping_address", postShipping_addressAPI);

module.exports = router;
