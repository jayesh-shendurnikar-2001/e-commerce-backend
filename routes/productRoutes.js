const express = require("express");
const {
    getProducts,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();

/**
 * Product Routes
 * GET /api/products     - Fetch all products
 * GET /api/products/:id - Fetch single product by ID
 */
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
