const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedDatabase = require("./seeds/seedData");

// Load env vars
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/device", deviceRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, data: { status: "OK", timestamp: new Date().toISOString() } });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB (auto-creates DB if not exists)
  await connectDB();

  // Auto-seed data if collections are empty
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  SmartVent API running on port ${PORT}`);
    console.log(`  http://localhost:${PORT}/api/health`);
    console.log(`========================================\n`);
  });
};

startServer();
