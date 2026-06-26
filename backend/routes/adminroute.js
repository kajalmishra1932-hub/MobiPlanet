const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
} = require("../controler/adminController");

router.post("/Admin-register", registerAdmin);
router.post("/Admin-login", loginAdmin);

module.exports = router;