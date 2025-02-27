const express = require("express");
const router = express.Router();
const {
    postOrderAPI,getOrderAPI
    
} = require("../controllers/orderController");

router.post("/createOrder", postOrderAPI);
router.get("/getOrder", getOrderAPI);


module.exports = router;
