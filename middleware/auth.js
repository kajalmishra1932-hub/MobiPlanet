// middleware/auth.js
const jwt = require('jsonwebtoken');

// 1. Check karega ki kya User ne login kiya hai? (Token hai?)
const verifyToken = (req, res, next) => {
  // Frontend se token aayega header mein
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied! Kripya pehle login karein." });
  }

  try {
    // Token ko verify karte hain ek secret key se
    const verified = jwt.verify(token, "MOBI_PLANET_SUPER_SECRET_KEY"); 
    req.user = verified; // User ka data (id aur role) nikal kar aage bhej diya
    next(); // Guard ne darwaza khol diya
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

// 2. Check karega ki kya yeh insaan Admin hai?
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access Denied! Aap Admin nahi hain." });
  }
  next(); // Agar admin hai, toh aage jane do
};

module.exports = { verifyToken, isAdmin };