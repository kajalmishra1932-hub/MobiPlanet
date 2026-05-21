const express = require('express');
const router = express.Router();

// Sahi model import kiya (Phone.js)
const Phone = require('../models/Phone'); 

// Security Middleware import kiya
const { verifyToken, isAdmin } = require('../middleware/auth');

// 1. GET all products (Sabke liye open) - API: GET /api/phones
router.get('/', async (req, res) => {
  try {
    const products = await Phone.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST a new product (Sirf Admin ke liye secure) - API: POST /api/phones/add
router.post('/add', [verifyToken, isAdmin], async (req, res) => {
  try {
    const newProduct = new Phone(req.body);
    const savedProduct = await newProduct.save();
    
    res.status(201).json({ 
      message: "Product Added Successfully!", 
      product: savedProduct 
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;