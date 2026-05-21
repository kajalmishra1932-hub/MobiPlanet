const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },       // e.g., "iPhone 13 Pro"
  brand: { type: String, required: true },      // e.g., "Apple"
  category: { 
    type: String, 
    enum: ['Android', 'iPhone', 'Gaming', 'Laptops'], 
    required: true 
  },
  price: { type: Number, required: true },
  description: { type: String },
  condition: { 
    type: String, 
    enum: ['Like New', 'Excellent', 'Good', 'Fair'], 
    default: 'Good' 
  },
  images: [String],                             // Array of image URLs
  stock: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);