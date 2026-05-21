// routes/phoneRoutes.js
const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone');

// 1. Naya Phone Add Karne ka Route (POST)
router.post('/add', async (req, res) => {
  try {
    const { name, brand, price, description, imageUrl, stock } = req.body;
    
    const newPhone = new Phone({ name, brand, price, description, imageUrl, stock });
    await newPhone.save();
    
    res.status(201).json({ message: "Phone added successfully!", phone: newPhone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Saare Phones ko Frontend par Dikhane ka Route (GET)
router.get('/all', async (req, res) => {
  try {
    const phones = await Phone.find(); // Database se saare phones nikalega
    res.status(200).json(phones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Ek specific phone ki detail dekhne ke liye (GET by ID) - "View Details" page ke liye
router.get('/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }
    res.status(200).json(phone);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

// --- 4. NAYA CODE: Phone Delete Karne ka Route (DELETE) ---
router.delete('/delete/:id', async (req, res) => {
  try {
    const phoneId = req.params.id;
    
    // Database se ID ke hisaab se phone dhoondh kar delete karein
    const deletedPhone = await Phone.findByIdAndDelete(phoneId);
    
    if (!deletedPhone) {
      return res.status(404).json({ message: "Phone nahi mila!" });
    }
    
    res.status(200).json({ message: "Phone successfully delete ho gaya!" });
  } catch (err) {
    console.error("Error deleting phone:", err);
    res.status(500).json({ error: "Server error, phone delete nahi hua." });
  }
});

module.exports = router;