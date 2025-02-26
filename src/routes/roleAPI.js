const express = require("express");
const router = express.Router();
const {
    postRoleAPI
} = require("../controllers/roleController");

router.post("/createRole", postRoleAPI);

module.exports = router;
