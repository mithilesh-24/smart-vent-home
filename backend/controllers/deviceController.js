const Device = require("../models/Device");
const DeviceData = require("../models/DeviceData");

// POST /api/device/add
const addDevice = async (req, res) => {
  try {
    const { id, name, location, type, status } = req.body;

    if (!id || !name || !location || !type) {
      return res.status(400).json({ success: false, message: "id, name, location, and type are required" });
    }

    const device = await Device.create({
      id,
      name,
      location,
      type,
      status: status || "online",
      lastSeen: "Just now",
      user: req.user._id,
    });

    console.log(`[DEVICE] Added device ${device.name} for user ${req.user.email}`);
    res.status(201).json({ success: true, data: device });
  } catch (error) {
    console.error("[DEVICE] Add error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add device" });
  }
};

// GET /api/device/latest
const getLatestData = async (req, res) => {
  try {
    const latest = await DeviceData.findOne().sort({ createdAt: -1 }).select("-_id -__v -createdAt -updatedAt");

    if (!latest) {
      return res.json({
        success: true,
        data: { time: "00:00", aqi: 42, temperature: 22.0, humidity: 48 },
      });
    }

    console.log("[DEVICE] Fetched latest data point");
    res.json({ success: true, data: latest });
  } catch (error) {
    console.error("[DEVICE] Latest data error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch latest data" });
  }
};

// GET /api/device/history
const getHistory = async (req, res) => {
  try {
    const history = await DeviceData.find()
      .sort({ createdAt: 1 })
      .select("-_id -__v -createdAt -updatedAt")
      .limit(24);

    console.log(`[DEVICE] Fetched ${history.length} history points`);
    res.json({ success: true, data: history });
  } catch (error) {
    console.error("[DEVICE] History error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
};

// GET /api/device/all
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().select("-_id -__v -createdAt -updatedAt -user");
    console.log(`[DEVICE] Fetched ${devices.length} devices`);
    res.json({ success: true, data: devices });
  } catch (error) {
    console.error("[DEVICE] Fetch all error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch devices" });
  }
};

// GET /api/device/room-aqi
const getRoomAqi = async (req, res) => {
  try {
    // Return seeded room AQI data
    const roomAqi = [
      { room: "Living", aqi: Math.round(35 + Math.random() * 15) },
      { room: "Kitchen", aqi: Math.round(55 + Math.random() * 20) },
      { room: "Bedroom", aqi: Math.round(30 + Math.random() * 10) },
      { room: "Bathroom", aqi: Math.round(45 + Math.random() * 12) },
      { room: "Office", aqi: Math.round(40 + Math.random() * 15) },
    ];
    res.json({ success: true, data: roomAqi });
  } catch (error) {
    console.error("[DEVICE] Room AQI error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch room AQI" });
  }
};

module.exports = { addDevice, getLatestData, getHistory, getDevices, getRoomAqi };
