const express = require("express");
const router = express.Router();
const {
    postProductAPI
} = require("../controllers/productController");

router.post("/createProduct", postProductAPI);

module.exports = router;
