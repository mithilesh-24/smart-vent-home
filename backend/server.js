const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const seedDatabase = require("./seeds/seedData");

// Load env vars
dotenv.config();

// Verify essential environment variables
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0) {
  console.warn(`\n[WARNING] Missing environment variables: ${missingEnv.join(", ")}`);
  console.warn("The application may not function correctly without these variables.\n");
} else {
  console.log("\n[SUCCESS] Essential environment variables verified.\n");
}

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
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
  res.json({ 
    success: true, 
    data: { 
      status: "OK", 
      timestamp: new Date().toISOString(),
      database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
      environment: process.env.NODE_ENV || "development"
    } 
  });
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
  try {
    // Connect to MongoDB
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      // Auto-seed data if collections are empty
      await seedDatabase();
    } else {
      console.warn("[WARN] Starting server without database connection...");
    }
  } catch (error) {
    console.error("Critical failure during initialization:", error.message);
    // Still not exiting as per user request to keep backend "running"
  }

  app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  SmartVent API running on port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`========================================\n`);
  });
};

startServer();
