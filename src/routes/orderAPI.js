const express = require("express");
const router = express.Router();
const {
  postOrderAPI,
  getOrderAPI,
  getOrderByUserIdAPI,
  updateOrderAPI,
  deleteOrderAPI,
} = require("../controllers/orderController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createOrder", postOrderAPI);
router.get("/getOrder", getOrderAPI);
router.get("/getOrderByUserID/:id", getOrderByUserIdAPI);
router.put("/updateOrder/:id", checkAdminMiddleware, updateOrderAPI);
router.delete("/deleteOrder/:id", deleteOrderAPI);

module.exports = router;
