const mongoose = require("mongoose");

// Matches frontend Product interface exactly
const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Fans", "Sensors", "Controllers", "Networking"],
    },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    specs: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
