const express = require("express");
const router = express.Router();
const {
  postShipping_addressAPI,
  getShipping_addressAPI,
  getShipping_addressByIdAPI,
  updateShipping_addressAPI,
  deleteShipping_addressAPI,
} = require("../controllers/Shipping_addressController");
const checkAdminMiddleware = require("../middleware/authMiddleware");

router.post("/createShipping_address", postShipping_addressAPI);
router.get("/getShipping_address", getShipping_addressAPI);
router.get("/getShipping_address/:id", getShipping_addressByIdAPI);
router.put("/updateShipping_address/:id", checkAdminMiddleware, updateShipping_addressAPI);
router.delete("/deleteShipping_address/:id", checkAdminMiddleware, deleteShipping_addressAPI);

module.exports = router;
