/*
 * Fetches products from dummyjson.com and inserts them into MongoDB.
 * Run: node seed.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

// Load environment variables
dotenv.config();

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Fetch products from dummyjson.com
        console.log("Fetching products from dummyjson.com...");
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();

        // Map API data to our Product schema format
        const products = data.products.map((p) => ({
            title: p.title,
            description: p.description,
            price: p.price,
            stock: p.stock,
            thumbnail: p.thumbnail,
            category: p.category,
            brand: p.brand || "",
            rating: p.rating,
        }));

        // Clear existing products and insert new ones
        await Product.deleteMany({});
        const inserted = await Product.insertMany(products);

        console.log(`Successfully inserted ${inserted.length} products`);

        process.exit(0);
    } catch (error) {
        console.error(`Inserting failed: ${error.message}`);
        process.exit(1);
    }
};

// calling the function
seedProducts();
