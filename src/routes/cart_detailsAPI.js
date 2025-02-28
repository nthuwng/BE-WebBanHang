const express = require("express");
const router = express.Router();
const {
  postCart_detailsAPI,
  getCart_detailsAPI,
  getCart_detailsByIdAPI,
  updateCart_detailsAPI,
  deleteCart_detailsAPI,
} = require("../controllers/cart_detailsController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createCart_details", postCart_detailsAPI);
router.get("/getCart_details", getCart_detailsAPI);
router.get("/getCart_details/:id", getCart_detailsByIdAPI);
router.put("/updateCart_details/:id", checkAdminMiddleware, updateCart_detailsAPI);
router.delete("/deleteCart_details/:id", checkAdminMiddleware, deleteCart_detailsAPI);

module.exports = router;
