const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addDevice, getLatestData, getHistory, getDevices, getRoomAqi } = require("../controllers/deviceController");

router.use(protect);

router.post("/add", addDevice);
router.get("/latest", getLatestData);
router.get("/history", getHistory);
router.get("/all", getDevices);
router.get("/room-aqi", getRoomAqi);

module.exports = router;
