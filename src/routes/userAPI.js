const express = require("express");
const router = express.Router();
const {
  postCreateUserAPI,
  getALLUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  addAvatarAPI,
  loginUserAPI,
  registerUserAPI,
  getAccountAPI,
} = require("../controllers/userController");

router.post("/createUser", postCreateUserAPI);
router.get("/allUser", getALLUserAPI);
router.put("/updateUser", putUpdateUserAPI);
router.delete("/deleteUser", deleteUserAPI);
router.post("/addAvatar", addAvatarAPI);
router.post("/sign-in", loginUserAPI);
router.post("/sign-up", registerUserAPI);
router.get("/account", getAccountAPI);

module.exports = router;
