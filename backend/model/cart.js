const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(

  {

    // 👤 USER ID
    userId: {

      type: String,
      required: true,

    },

    // 📦 PRODUCT ID
    productId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",

      required: true,

    },

    // 🔢 QUANTITY
    quantity: {

      type: Number,

      default: 1,

    },

    // 💰 PRICE
    price: {

      type: Number,

      required: true,

    },

  },

  {

    timestamps: true,

  }

);

module.exports = mongoose.model(
  "Cart",
  cartSchema
);