const express = require("express");
const router = express.Router();
const {
  postProductAPI,
  getProductAPI,
  updateProductAPI,
  getProductByIdAPI,
  deleteProductAPI,
  addImageProductAPI,
} = require("../controllers/productController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createProduct", postProductAPI);
router.post("/addImgProduct", addImageProductAPI);
router.get("/getProduct", getProductAPI);
router.get("/getProduct/:id", getProductByIdAPI);
router.put("/updateProduct/:id", checkAdminMiddleware, updateProductAPI);
router.delete("/deleteProduct/:id", checkAdminMiddleware, deleteProductAPI);

module.exports = router;
