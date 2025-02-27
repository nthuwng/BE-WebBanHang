const express = require("express");
const router = express.Router();
const {
    postCartsAPI,getCartsAPI
} = require("../controllers/cartsController");

router.post("/createCategory", postCartsAPI);
router.get("/getCategory", getCartsAPI);


module.exports = router;
