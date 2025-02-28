const express = require("express");
const router = express.Router();
const {
  postOrderAPI,
  getOrderAPI,
  getOrderByIdAPI,
  updateOrderAPI,
  deleteOrderAPI,
} = require("../controllers/orderController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createOrder", postOrderAPI);
router.get("/getOrder", getOrderAPI);
router.get("/getOrder/:id", getOrderByIdAPI);
router.put("/updateOrder/:id", checkAdminMiddleware, updateOrderAPI);
router.delete("/deleteOrder/:id", checkAdminMiddleware, deleteOrderAPI);

module.exports = router;
