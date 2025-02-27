const express = require("express");
const router = express.Router();
const {
    postOrder_detailsAPI,getOrder_detailsAPI
} = require("../controllers/Order_detailsController");

router.post("/createOrder_details", postOrder_detailsAPI);
router.get("/getOrder_details", getOrder_detailsAPI);


module.exports = router;
