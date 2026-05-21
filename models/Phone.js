// models/Phone.js
const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true }, // Image ka link
  stock: { type: Number, default: 1 } // Kitne phones available hain
}, { timestamps: true });

module.exports = mongoose.model('Phone', phoneSchema);