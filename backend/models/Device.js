const mongoose = require("mongoose");

// Matches frontend Device interface exactly
const deviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ["online", "offline"], default: "online" },
    lastSeen: { type: String, default: "1 min ago" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
