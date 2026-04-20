const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderController");

router.use(protect);

router.post("/create", createOrder);
router.get("/", getOrders);

module.exports = router;
