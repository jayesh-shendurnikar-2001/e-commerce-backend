const mongoose = require("mongoose");

/**
 * Product Schema
 * Stores product details for the ShoppyGlobe store
 * Fields: title, description, price, stock, thumbnail, category, brand, rating
 */
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "Stock cannot be negative"],
        },
        thumbnail: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "general",
        },
        brand: {
            type: String,
            default: "",
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
