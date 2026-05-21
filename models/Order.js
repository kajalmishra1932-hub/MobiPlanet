const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  items: { type: Array, required: true }, // Jo phones cart mein the
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery (COD)' },
  status: { type: String, default: 'Pending' }, // Baad mein Admin isko 'Delivered' kar sakta hai
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);