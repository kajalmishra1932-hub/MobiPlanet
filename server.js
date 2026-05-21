require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- 1. MODELS IMPORT ---
const Subscriber = require('./models/Subscriber');
const SellRequest = require('./models/SellRequest');
const Order = require('./models/Order');
const Phone = require('./models/Phone'); // Isse import karna zaroori hai

// --- 2. SCHEMAS (Avoid OverwriteModelError) ---
const Banner = mongoose.models.Banner || mongoose.model('Banner', new mongoose.Schema({
    id: Number, bgColor: String, title: String, subtitle: String, 
    benefit: String, promo: String, img: String
}));

const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({
    id: Number, name: String, image: String, path: String
}));

const HeroContent = mongoose.models.HeroContent || mongoose.model('HeroContent', new mongoose.Schema({
    badge: String, headingMain: String, headingHighlight: String, 
    discountPercent: String, subtext: String, trustBadges: [String]
}));

// Security Middleware
const { verifyToken, isAdmin } = require('./middleware/auth');

// Route Imports
const userRoutes = require('./routes/userRoutes');
const phoneRoutes = require('./routes/phoneRoutes'); 

const app = express();

// --- 3. MIDDLEWARE ---
app.use(cors({ 
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://mobiplanet.onrender.com'] 
})); 
app.use(express.json()); 

// --- 4. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MobiPlanet DB Connected"))
    .catch(err => console.error("❌ DB Error:", err));

// --- 5. API ROUTES ---

// Banners API
app.get('/api/banners', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (err) {
        res.status(500).json({ error: "Banners load nahi hue" });
    }
});

// Categories API
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Categories fetch fail" });
    }
});

// Hero Section Content API
app.get('/api/hero-content', async (req, res) => {
    try {
        const content = await HeroContent.findOne();
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: "Hero data missing" });
    }
});

// Featured Products API
app.get('/api/featured-products', async (req, res) => {
    try {
        // Use the Phone model directly
        const products = await Phone.find().limit(6);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Products fetch fail" });
    }
});

// --- ADMIN ROUTES ---

// Admin: Add Banner
app.post('/api/admin/add-banner', [verifyToken, isAdmin], async (req, res) => {
    try {
        const newBanner = new Banner(req.body);
        await newBanner.save();
        res.json({ message: "Banner Added!" });
    } catch (err) {
        res.status(500).json({ error: "Banner save fail" });
    }
});

// Admin: Add Product (New API)
app.post('/api/admin/add-product', async (req, res) => {
    try {
        const newProduct = new Phone(req.body); 
        const savedProduct = await newProduct.save(); 
        
        res.status(201).json({ 
            message: "Product Added Successfully!", 
            product: savedProduct 
        });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ 
            error: "Product save fail", 
            details: err.message 
        });
    }
});

// Existing Routes
app.use('/auth', userRoutes);
app.use('/api/phones', phoneRoutes);

// --- 6. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));