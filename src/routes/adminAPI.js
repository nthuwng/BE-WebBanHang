const express = require("express");
const router = express.Router();
const {
  postCreateAdminAPI,
  getALLAdminAPI,
  putUpdateAdminAPI,
  deleteAdminAPI,
  addAvatarAPI,
} = require("../controllers/adminController");

router.post("/createAdmin", postCreateAdminAPI);
router.get("/allAdmin", getALLAdminAPI);
router.put("/updateAdmin", putUpdateAdminAPI);
router.delete("/deleteAdmin", deleteAdminAPI);
router.post("/addAvatar", addAvatarAPI);

module.exports = router;
