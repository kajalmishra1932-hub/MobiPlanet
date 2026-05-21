const mongoose = require('mongoose');

const sellRequestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  deviceBrand: { type: String, required: true },
  deviceModel: { type: String, required: true },
  condition: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Admin baad mein isko 'Contacted' ya 'Completed' kar sakta hai
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SellRequest', sellRequestSchema);