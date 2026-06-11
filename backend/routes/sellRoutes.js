// 📂 routes/sellPhone.js

const express = require("express");
const router = express.Router();

const {
  createSellRequest,
  getAllSellRequests,
  getSingleSellRequest,
  updateSellRequestStatus,
  deleteSellRequest,
  getSellRequestCount,
} = require("../controler/sellcontroller");


// ================= CREATE =================
router.post("/sellphone", createSellRequest);


// ================= GET ALL =================
router.get("/sellphone", getAllSellRequests);


// ================= COUNT (IMPORTANT: keep above :id) =================
router.get("/sellphone/count", getSellRequestCount);


// ================= GET SINGLE =================
router.get("/sellphone/:id", getSingleSellRequest);


// ================= UPDATE =================
router.put("/sellphone/:id", updateSellRequestStatus);


// ================= DELETE =================
router.delete("/sellphone/:id", deleteSellRequest);


module.exports = router;