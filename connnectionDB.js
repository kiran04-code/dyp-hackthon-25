const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // re-throw for the calling file to catch
  }
}

module.exports = { connectDB };