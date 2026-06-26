const Admin = require("../model/admin");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 👈 1. JWT ko yahan import kiya

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExist = await Admin.findOne({ email });

    if (adminExist) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1000d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
