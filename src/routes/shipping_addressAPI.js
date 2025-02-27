const express = require("express");
const router = express.Router();
const {
    postShipping_addressAPI,getShipping_addressAPI
} = require("../controllers/shipping_addressController");

router.post("/createShipping_address", postShipping_addressAPI);
router.get("/getShipping_address", getShipping_addressAPI);


module.exports = router;
