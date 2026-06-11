const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
 getProductsByCategory,
} = require("../controler/category");

router.post("/category", createCategory);
router.get("/categorydata", getCategories);


router.get("/mobiledata/:category",  getProductsByCategory);

module.exports = router;  