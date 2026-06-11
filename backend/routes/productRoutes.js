const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
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
  confirmOrdersCount,deleteProduct

} = require("../controler/productcontroller");


// ================= PRODUCT ROUTES =================

router.post("/add", upload.single("image"), createProduct);

router.get("/products", getproduct);

router.get("/product/:id", getProductById);

router.put("/product/:id", upload.single("image"), updateProduct);


// ================= PENDING ORDERS =================

router.get("/orderss/pendinglist", pendingOrders);

router.get("/orderss/pendinglist/count", pendingOrdersCount);


// ================= DELIVERED ORDERS =================

router.get("/orderss/deliveredlist", deliveredOrders);

router.get("/orderss/deliveredlist/count", deliveredOrdersCount);


// ================= OUT FOR DELIVERY ORDERS =================

router.get("/orderss/outfordelivery", outForDeliveryOrders);

router.get(
  "/orderss/outfordeliverylist/count",
  outForDeliveryOrdersCount
);
router.get("/confirmlist", confirmOrders);

router.get(
  "/confirmcount",
  confirmOrdersCount
);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;