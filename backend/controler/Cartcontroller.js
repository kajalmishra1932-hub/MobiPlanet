const mongoose = require("mongoose");
const Cart = require("../model/cart");
const Product = require("../model/product");
const crypto = require("crypto");
const razorpay = require("../middleware/Razorpay"); // ok

// ⚠️ HARD CODED SECRET (NOT RECOMMENDED FOR PRODUCTION)
const RAZORPAY_SECRET = "yyYiZ1j4KcnwxOt7Wk2XgCMQ";

// ============================
// 🛒 ADD TO CART
// ============================
const addCart = async (req, res) => {
  try {
    let { userId, productId, quantity } = req.body;

    quantity = Number(quantity || 1);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const existingCart = await Cart.findOne({ userId, productId });

    if (existingCart) {
      existingCart.quantity += quantity;
      await existingCart.save();

      return res.json({
        success: true,
        message: "Cart Updated",
      });
    }

    const newCart = new Cart({
      userId,
      productId,
      quantity,
      price: product.price,
    });

    await newCart.save();

    res.json({
      success: true,
      message: "Added To Cart",
      data: newCart,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// 🛒 GET CART
// ============================
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.params.userId,
    }).populate("productId", "brand modelName image price category");

    res.json({
      success: true,
      data: cartItems,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// ❌ REMOVE CART ITEM
// ============================
const removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Cart Item Removed",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// 💰 CART TOTAL
// ============================
const cartTotal = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.params.userId,
    });

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    res.json({
      success: true,
      totalAmount,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// 💳 CREATE ORDER (PAYMENT)
// ============================
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount required",
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.status(200).json({
      success: true,
      order,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// 🔐 VERIFY PAYMENT
// ============================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// EXPORTS
// ============================
module.exports = {
  addCart,
  getCart,
  removeCart,
  cartTotal,
  createOrder,
  verifyPayment,
};