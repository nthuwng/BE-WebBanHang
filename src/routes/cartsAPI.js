const express = require("express");
const router = express.Router();
const {
  postCartAPI,
  getCartAPI,
  getCartByIdAPI,
  updateCartAPI,
  deleteCartAPI,
} = require("../controllers/cartsController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createCart", postCartAPI);
router.get("/getCart", getCartAPI);
router.get("/getCart/:id", getCartByIdAPI);
router.put("/updateCart/:id", checkAdminMiddleware, updateCartAPI);
router.delete("/deleteCart/:id", checkAdminMiddleware, deleteCartAPI);

module.exports = router;
