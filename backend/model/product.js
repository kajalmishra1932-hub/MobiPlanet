const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: String,
    brand: String,
    modelName: String,
    price: Number,
    discount: Number,
   stock: {
  type: String,
  enum: ["In Stock", "Out of Stock"],
  default: "In Stock",
},
    ram: String,
    storage: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);