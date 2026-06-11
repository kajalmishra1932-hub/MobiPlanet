  const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema(
    {
      orderNumber: String,

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // 📦 Mobile cart style data
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          name: String,
          price: Number,
          quantity: Number,
          image: String,
        },
      ],

      // 💰 total amount
      totalAmount: Number,

      // 📍 mobile delivery address (simple)
      address: {
        flat: String,
        area: String,
        city: String,
        pincode: String,
        phone: String,
      },

      // 📱 order status (mobile tracking)
      status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Confirm", "Out for Delivery", "Delivered"],
      },

      // 💳 payment
      paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD",
      },

      isPaid: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Order", orderSchema);