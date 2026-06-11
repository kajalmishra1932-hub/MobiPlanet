const Product = require("../model/product");
const order = require("../model/Address");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      category,
      brand,
      modelName,
      price,
      discount,
      stock,
      ram,
      storage,
      description,
    } = req.body;

    // 👇 image multer se aayegi
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      category,
      brand,
      modelName,
      price,
      discount,
      stock,
      ram,
      storage,
      description,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET ALL PRODUCTS
const getproduct = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products,
      total: products.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {

    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID missing",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      category,
      brand,
      modelName,
      price,
      discount,
      stock,
      ram,
      storage,
      description,
    } = req.body;

    // STOCK VALIDATION
    const allowedStock = ["In Stock", "Out of Stock"];

    if (stock && !allowedStock.includes(stock)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock value",
      });
    }

    // UPDATE FIELDS
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.modelName = modelName ?? product.modelName;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.stock = stock ?? product.stock;
    product.ram = ram ?? product.ram;
    product.storage = storage ?? product.storage;
    product.description = description ?? product.description;

    // IMAGE UPDATE
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    const updated = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// ✅ PENDING ORDERS
// ======================================================

async function pendingOrders(req, res) {
  try {

    let orders = await order.find({
      status: { $regex: /^pending$/i },
    })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("items.productId");

    res.json({
      success: true,
      data: orders,
      total: orders.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

async function pendingOrdersCount(req, res) {
  try {

    let count = await order.countDocuments({
      status: { $regex: /^pending$/i },
    });

    res.status(200).json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// ======================================================
// ✅ DELIVERED ORDERS
// ======================================================

async function deliveredOrders(req, res) {
  try {

    let orders = await order.find({
      status: { $regex: /^delivered$/i },
    })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("items.productId");

    res.json({
      success: true,
      data: orders,
      total: orders.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

async function deliveredOrdersCount(req, res) {
  try {

    let count = await order.countDocuments({
      status: { $regex: /^delivered$/i },
    });

    res.status(200).json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// ======================================================
// ✅ OUT FOR DELIVERY ORDERS
// ======================================================

async function outForDeliveryOrders(req, res) {
  try {

    let orders = await order.find({
      status: { $regex: /^out for delivery$/i },
    })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("items.productId");

    res.json({
      success: true,
      data: orders,
      total: orders.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

async function outForDeliveryOrdersCount(req, res) {
  try {

    let count = await order.countDocuments({
      status: { $regex: /^out for delivery$/i },
    });

    res.status(200).json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}
// ======================================================
// ✅ CONFIRM ORDERS
// ======================================================

async function confirmOrders(req, res) {
  try {

    let orders = await order.find({
      status: { $regex: /^confirm$/i },
    })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("items.productId");

    res.json({
      success: true,
      data: orders,
      total: orders.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// COUNT
async function confirmOrdersCount(req, res) {
  try {

    let count = await order.countDocuments({
      status: { $regex: /^confirm$/i },
    });

    res.status(200).json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};



module.exports = {
  createProduct,
  getproduct,
  getProductById,
  updateProduct,
  pendingOrders,
  pendingOrdersCount,
  deliveredOrders,
  deliveredOrdersCount,
  outForDeliveryOrders,
  outForDeliveryOrdersCount,
  confirmOrders,
  confirmOrdersCount,
  deleteProduct,
};