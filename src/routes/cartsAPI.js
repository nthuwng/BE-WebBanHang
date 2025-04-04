const express = require("express");
const router = express.Router();
const {
  postCartAPI,
  getCartAPI,
  getCartByIdAPI,
  updateCartAPI,
  deleteCartAPI,
  postAddProductToCart,
  getCartByUserID,
} = require("../controllers/cartsController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createCart", postCartAPI);
router.get("/getCart", getCartAPI);
router.get("/getCart/:id", getCartByIdAPI);
router.put("/updateCart/:id", checkAdminMiddleware, updateCartAPI);
router.delete("/deleteCart/:id", checkAdminMiddleware, deleteCartAPI);
router.post("/addProductToCart", postAddProductToCart);
router.get("/getCartByUserID/:id", getCartByUserID);

module.exports = router;
