const express = require("express");
const router = express.Router();
const {
  postProductAPI,
  getProductAPI,
  updateProductAPI,
} = require("../controllers/productController");
const checkAdminMiddleware = require("../middleware/adminMiddleware");

router.post("/createProduct", postProductAPI);
router.get("/getProduct", getProductAPI);
// router.put("/updateProduct", updateProductAPI);
router.put("/updateProduct/:id", checkAdminMiddleware, updateProductAPI);

module.exports = router;
