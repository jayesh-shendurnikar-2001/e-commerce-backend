const mongoose = require("mongoose");

/*
 * connectDB - Connects to MongoDB using Mongoose
 * Uses MONGO_URI from environment variables
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`MongoDB Connection Error`);
  }
};

module.exports = connectDB;
