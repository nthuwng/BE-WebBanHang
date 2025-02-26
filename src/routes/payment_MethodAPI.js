const express = require("express");
const router = express.Router();
const {
    postPayment_methodAPI
} = require("../controllers/payment_method_Controller");

router.post("/create_payment_method", postPayment_methodAPI);

module.exports = router;
