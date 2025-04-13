const express = require("express");
const router = express.Router();
const {
  postCart_detailsAPI,
  getCart_detailsAPI,
  getCart_detailsByIdAPI,
  updateCart_detailsAPI,
  deleteCart_detailsAPI,
  getCart_details_ByUserId,
} = require("../controllers/cart_detailsController");

router.post("/createCart_details", postCart_detailsAPI);
router.get("/getCart_details", getCart_detailsAPI);
router.get("/getCart_details/:id", getCart_detailsByIdAPI);
router.put("/updateCart_details/:id", updateCart_detailsAPI);
router.delete("/deleteCart_details", deleteCart_detailsAPI);
router.get("/getCart_details_ByUserId", getCart_details_ByUserId);

module.exports = router;
