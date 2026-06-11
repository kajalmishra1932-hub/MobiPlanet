const Category = require("../model/caategoryy");
const Mobile = require("../model/product");

const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const saveCategory = await Category.findOneAndUpdate(
      { category },
      { category },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Category created",
      data: saveCategory,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: categories.length,
      data: categories,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};




const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    let products;

    // ✅ ALL PRODUCTS
    if (category.toLowerCase() === "all") {
      products = await Mobile.find();
    } 
    
    // ✅ CATEGORY PRODUCTS
    else {
      products = await Mobile.find({
        category: {
          $regex: new RegExp("^" + category + "$", "i"),
        },
      });
    }

    res.status(200).json({
      success: true,
      total: products.length,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  createCategory,
  getCategories,
   getProductsByCategory,
};