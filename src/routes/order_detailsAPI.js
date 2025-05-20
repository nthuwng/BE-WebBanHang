const express = require("express");
const router = express.Router();
const {
  postOrder_detailsAPI,
  getOrder_detailsAPI,
  getOrder_detailsByOrderAPI,
  updateOrder_detailsAPI,
  deleteOrder_detailsAPI,
} = require("../controllers/order_detailsController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createOrder_details", postOrder_detailsAPI);
router.get("/getOrder_details", getOrder_detailsAPI);
router.get("/getOrder_details/:id", getOrder_detailsByOrderAPI);
router.put("/updateOrder_details/:id", checkAdminMiddleware, updateOrder_detailsAPI);
router.delete("/deleteOrder_details/:id", checkAdminMiddleware, deleteOrder_detailsAPI);

module.exports = router;
