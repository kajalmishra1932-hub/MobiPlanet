const Order = require("../model/Address");
const Cart = require("../model/cart");
const mongoose = require("mongoose");

// =====================================
// 🧾 GENERATE ORDER NUMBER
// =====================================
const generateOrderNumber = () => {
  return "ORD" + Date.now();
};

// =====================================
// 🛒 PLACE ORDER (CART → ORDER)
// =====================================
const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      address,
      paymentMethod,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Required",
      });
    }

    // 🔥 GET CART ITEMS
    const cartItems = await Cart.find({
      userId,
    }).populate("productId");

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Cart Empty",
      });
    }

    // 🔥 FORMAT ITEMS
    const items = cartItems.map((item) => ({
      productId: item.productId._id,
      name: item.productId.modelName,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.image,
    }));

    // 💰 TOTAL CALCULATION
    let totalAmount = 0;

    items.forEach((i) => {
      totalAmount += i.price * i.quantity;
    });

    // 🧾 CREATE ORDER
    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      userId,
      items,
      totalAmount,
      address,
      paymentMethod,
      isPaid:
        paymentMethod === "Online" ? true : false,
    });

    await newOrder.save();

    // 🧹 CLEAR CART AFTER ORDER
    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      data: newOrder,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =====================================
// 📦 GET USER ORDERS
// =====================================
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// =====================================
// 🔍 GET SINGLE ORDER
// =====================================
const getOrderById = async (req, res) => {
  try {

    const { id } = req.params;

    // ✅ CHECK VALID OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    // ✅ GET ORDER + POPULATE
    const order = await Order.findById(id)
      .populate("items.productId")
      .populate("userId");
console.log(order)
    // ❌ NOT FOUND
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    // ✅ SUCCESS
    res.json({
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

// =====================================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, restaurantRemark } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        status,
        restaurantRemark,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Status Updated",
      data: updated,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =====================================
// ❌ CANCEL ORDER (USER)
// =====================================
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel delivered order",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Order Cancelled",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// controllers/authController.js



const getSingleOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    // 🔍 FIND ORDER + POPULATE USER
    const order = await Order.findOne({ orderNumber })
      .populate("items.productId")
      .populate({
    path: "userId",
    select: "firstName LastName email contact"
  }); // no projection first (safe)
console.log(order)
    // ❌ NOT FOUND
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 👤 SAFE USER EXTRACTION
    const user = order.userId;

    // 📦 RESPONSE
    return res.status(200).json({
      success: true,

      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,

        // ✅ FIXED USER OBJECT
        user: user
          ? {
              firstName: user.firstName || "",
              lastName: user.lastName || "",   // ✅ correct field (NOT LastName)
              email: user.email || "",
              contact: user.contact || "",
            }
          : null,

        address: order.address || {},
        items: order.items || [],
      },
    });

  } catch (err) {
    console.log("getSingleOrder Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
const getOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


 

module.exports = {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
   getSingleOrder,
   getAllOrders,
     getOrdersCount,   // 

};