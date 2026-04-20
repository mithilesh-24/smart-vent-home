const mongoose = require("mongoose");

// Matches frontend TimePoint interface: { time, aqi, temperature, humidity }
const deviceDataSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    aqi: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeviceData", deviceDataSchema);
