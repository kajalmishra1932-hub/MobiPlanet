// 📂 controllers/sellPhoneController.js

const SellPhone = require("../model/sellphone");


// ================= CREATE SELL REQUEST =================

const createSellRequest = async (req, res) => {

  try {

    const {
      brand,
      model,
      storage,
      ram,
      condition,
      battery,
      expectedPrice,
      damage,
      accessories,
      description,
      name,
      phone,
      city,
      address,
    } = req.body;

    // VALIDATION

    if (
      !brand ||
      !model ||
      !condition ||
      !expectedPrice ||
      !name ||
      !phone ||
      !city ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // CREATE REQUEST

    const newSellRequest = new SellPhone({
      brand,
      model,
      storage,
      ram,
      condition,
      battery,
      expectedPrice,
      damage,
      accessories,
      description,
      name,
      phone,
      city,
      address,
    });

    // SAVE

    await newSellRequest.save();

    // RESPONSE

    res.status(201).json({
      success: true,
      message: "Sell request submitted successfully 🚀",
      data: newSellRequest,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ================= GET ALL REQUESTS =================

const getAllSellRequests = async (req, res) => {

  try {

    const requests = await SellPhone.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: requests.length,
      data: requests,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ================= GET SINGLE REQUEST =================

const getSingleSellRequest = async (req, res) => {

  try {

    const request = await SellPhone.findById(
      req.params.id
    );

    if (!request) {

      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ================= UPDATE STATUS =================

const updateSellRequestStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const updatedRequest =
      await SellPhone.findByIdAndUpdate(

        req.params.id,

        {
          status,
        },

        {
          new: true,
        }
      );

    if (!updatedRequest) {

      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedRequest,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ================= DELETE REQUEST =================

const deleteSellRequest = async (req, res) => {

  try {

    const deletedRequest =
      await SellPhone.findByIdAndDelete(
        req.params.id
      );

    if (!deletedRequest) {

      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= SELL PHONE COUNT =================

// ================= SELL PHONE COUNT =================

const getSellRequestCount = async (req, res) => {
  try {
    console.log("SellPhone count API hit");

    const count = await SellPhone.countDocuments({});

    return res.status(200).json({
      success: true,
      count,
    });

  } catch (error) {
    console.log("SELLPHONE COUNT ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MODULE EXPORT =================

module.exports = {
  createSellRequest,
  getAllSellRequests,
  getSingleSellRequest,
  updateSellRequestStatus,
  deleteSellRequest,
    getSellRequestCount,
};