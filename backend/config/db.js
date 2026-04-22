const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("\n[CRITICAL ERROR] MONGO_URI is not defined in environment variables!");
    console.error("Please set MONGO_URI in your Railway project variables.\n");
    // As per user request: "Backend should not crash if env missing"
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`\n========================================`);
    console.log(`  MongoDB Connected: ${conn.connection.host}`);
    console.log(`  Database Name: ${conn.connection.name}`);
    console.log(`========================================\n`);
    return true;
  } catch (error) {
    console.error(`\n[ERROR] MongoDB Connection Failed: ${error.message}`);
    console.error("Check your MONGO_URI and Network Access settings in MongoDB Atlas.\n");
    // Not exiting to allow the server to at least start and respond to health checks
    return false;
  }
};

module.exports = connectDB;
