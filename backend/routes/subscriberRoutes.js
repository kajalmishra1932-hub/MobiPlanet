const express = require("express");
const router = express.Router();

const {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} = require("../controler/subscribecontroller");

router.post("/subscribe", subscribe);

router.get("/subscribers", getSubscribers);

router.delete("/subscriber/:id", deleteSubscriber);

module.exports = router;