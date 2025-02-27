const express = require("express");
const router = express.Router();
const {
    postProductAPI,getProductAPI
} = require("../controllers/productController");

router.post("/createProduct", postProductAPI);
router.get("/getProduct", getProductAPI);


module.exports = router;
