const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// API Routes

// Auth routes — POST /api/register & POST /api/login
app.use("/api", authRoutes);

// Product routes — GET /api/products & GET /api/products/:id
app.use("/api/products", productRoutes);

// Cart routes — GET, POST, PUT, DELETE /api/cart (protected)
app.use("/api/cart", cartRoutes);

// Error Handler (must be after routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start Express server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port no. ${PORT}`);
    });
});
