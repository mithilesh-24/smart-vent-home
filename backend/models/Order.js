const mongoose = require("mongoose");

// Matches frontend Order interface: { id, date, items, total, status }
const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    items: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Delivered", "Shipped", "Processing"],
      default: "Processing",
    },
    orderItems: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shipping: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
