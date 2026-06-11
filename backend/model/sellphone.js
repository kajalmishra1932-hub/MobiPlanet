const mongoose = require("mongoose");

const sellPhoneSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    storage: String,
    ram: String,
    condition: String,

    battery: String,
    expectedPrice: Number,

    damage: [String],
    accessories: [String],

    description: String,

    name: String,
    phone: String,
    city: String,
    address: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SellPhone",
  sellPhoneSchema
);