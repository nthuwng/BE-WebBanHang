const express = require("express");
const router = express.Router();
const {
    postCategoryAPI
} = require("../controllers/categoryController");

router.post("/createCategory", postCategoryAPI);

module.exports = router;
