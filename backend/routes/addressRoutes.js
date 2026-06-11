const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getSingleOrder,
  getAllOrders,
  getOrdersCount,
} = require("../controler/addresscontroller");


// ================= PLACE ORDER =================
router.post("/order", placeOrder);


// ================= ALL ORDERS (ADMIN / DASHBOARD) =================
router.get("/orderdata", getAllOrders);


// ================= ORDERS COUNT =================
router.get("/orders/count", getOrdersCount);


// ================= USER ORDERS =================
router.get("/orders/:userId", getUserOrders);


// ================= SINGLE ORDER BY ID =================
router.get("/orders/:id", getOrderById);


// ================= UPDATE ORDER =================
router.put("/order/:id", updateOrderStatus);


// ================= CANCEL ORDER =================
router.delete("/orders/:id", cancelOrder);


// ================= ORDER BY ORDER NUMBER =================
router.get("/orders/order/:orderNumber", getSingleOrder);

module.exports = router;