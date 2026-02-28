const mongoose = require("mongoose");

/**
 * Cart Schema
 * Each user has one cart document containing an array of items
 * Each item references a Product and stores the quantity
 */
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One cart per user
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"],
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
