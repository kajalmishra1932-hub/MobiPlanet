const express = require("express");

const router = express.Router();

const {

  addCart,
  getCart,
  removeCart,
  cartTotal,
  verifyPayment,createOrder

} = require("../controler/Cartcontroller");



router.post("/addcart", addCart);


router.get("/getcart/:userId", getCart);


router.delete("/removecart/:id", removeCart);


router.get("/cart-total/:userId", cartTotal);
router.post("/payment/verify", verifyPayment);
router.post("/payment/order", createOrder);

module.exports = router;