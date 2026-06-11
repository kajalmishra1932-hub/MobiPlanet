// 📂 model/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    LastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },
   resetOtp: {
  type: String,
},

otpExpire: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);