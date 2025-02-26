const express = require("express");
const router = express.Router();
const {
    postCartsAPI
} = require("../controllers/cartsController");

router.post("/createCategory", postCartsAPI);

module.exports = router;
