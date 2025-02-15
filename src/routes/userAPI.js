const express = require("express");
const router = express.Router();
const {
  postCreateUserAPI,
  getALLUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
} = require("../controllers/userController");

router.post("/createUser", postCreateUserAPI);
router.get("/allUser", getALLUserAPI);
router.put("/updateUser", putUpdateUserAPI);
router.delete("/deleteUser", deleteUserAPI);

module.exports = router;
