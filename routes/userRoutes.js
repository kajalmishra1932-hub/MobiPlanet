const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Model import karein
const jwt = require('jsonwebtoken'); // NAYA: JWT Security import ki hai

// 1. Registration Route
router.post('/register', async (req, res) => {
  try {
    // Frontend se aane wale saare fields yahan likhein (name/phone bhi add kiya hai taaki error na aaye)
    const { username, name, email, password, mobile, phone, address } = req.body; 

    // Check karein ki email pehle se toh nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Naya user banate waqt saari fields pass karein
    const newUser = new User({ 
      username: username || name,  // Agar frontend se name aaye, toh use username maan lo
      email, 
      password, 
      mobile: mobile || phone,     // Agar frontend se phone aaye, toh use mobile maan lo
      address 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Login Route (BULLETPROOF MASTER HACK KE SATH)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Pehle sirf email se user dhoondhein
    const user = await User.findOne({ email });
    
    // 2. Check karein ki user mila ya nahi, aur kya password match ho raha hai
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // --- 🚨 NAYA BRAHMASTRA HACK (Bulletproof) 🚨 ---
    let finalRole = user.role;
    
    // .trim() extra space hata dega aur .toLowerCase() sabko chote aksharon mein badal dega
    const safeEmail = email.trim().toLowerCase();

    if (safeEmail === 'kajalyadav@gmail.com') {
      finalRole = 'admin'; // Agar kajal hai, toh 100% Admin
    } else if (!finalRole) {
      finalRole = 'user';  // Baaki sabke liye normal user
    }

    // 3. JWT Token banayein (Security Guard ke liye)
    const token = jwt.sign(
      { id: user._id, role: finalRole },
      "MOBI_PLANET_SUPER_SECRET_KEY",
      { expiresIn: "1d" } // Token 1 din tak chalega
    );

    // 4. Frontend ko token, role aur success message bhejein
    res.status(200).json({ 
      message: "Login successful", 
      token: token,              
      role: finalRole, // <-- Yahan frontend ke liye saaf-saaf 'role' bheja ja raha hai
      user: user                 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;