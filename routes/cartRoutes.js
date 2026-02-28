const express = require("express");
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} = require("../controllers/cartController");
const protect = require("../middleware/auth");

const router = express.Router();

/**
 * Cart Routes — All routes are protected (require JWT)
 * GET    /api/cart     - Get user's cart
 * POST   /api/cart     - Add product to cart
 * PUT    /api/cart/:id - Update item quantity
 * DELETE /api/cart/:id - Remove item from cart
 */
router.use(protect); // Apply auth middleware to all cart routes

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", clearCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

module.exports = router;
