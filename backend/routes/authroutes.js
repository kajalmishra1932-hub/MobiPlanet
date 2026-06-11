// 📂 routes/authRoutes.js

const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getUsers,
  userCount,
  getProfile,
  updateProfile,
  changePassword, deleteUser,sendOtp,verifyOtp,resetPassword
} = require("../controler/authcontroller");
const auth = require("../middleware/auth");





router.post("/signup", signup);

router.post("/login", login);
router.get("/reguser", getUsers);

router.get("/reguser/user/count", userCount);
router.get("/profile/:id", getProfile);

router.put("/profile/:id", updateProfile);
router.post("/changepassword", changePassword);
router.delete("/managequote/:id", deleteUser);
router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

  

module.exports = router;