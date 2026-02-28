const Cart = require("../models/Cart");
const Product = require("../models/Product");

// grt cart
const getCart = async (req, res) => {
  try {
    // Find the cart document for the currently logged-in user
    let cart = await Cart.findOne({
      userId: req.user._id, // Match cart where userId = authenticated user's id
    }).populate("items.productId"); // Replace productId (ObjectId) with full Product document

    if (!cart) {
      // Return empty cart if none exists yet
      return res.json({ userId: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate productId is provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // Create new cart for this user
      cart = await Cart.create({
        userId: req.user._id,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Increase quantity if product already in cart
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    // Return populated cart
    cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    res.status(201).json(cart);
  } catch (error) {
    // Check if error happened because of invalid MongoDB ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // find cart based on user id
    const cart = await Cart.findOne({ userId: req.user._id });

    // if car not exist
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart by its subdocument _id
    const item = cart.items.id(req.params.id);

    // if item not exist
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update quantity
    item.quantity = quantity;
    await cart.save();

    // Return populated cart
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    // sending response
    res.json(updatedCart);
  } catch (error) {
    // Check if the error is related to an invalid MongoDB ObjectId
    if (error.kind === "ObjectId") {
      // Send a 400 Bad Request response to the client
      // because the provided ID format is not valid
      return res.status(400).json({
        message: "Invalid item ID format",
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    // checking cart based on user id
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item index
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.id
    );

    // Check if the item exists in the cart
    if (itemIndex === -1) {
      // If item is not found, return 404 response
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }
    // Remove item from array
    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Return populated cart
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    res.json(updatedCart);
  } catch (error) {
    // Check if error happened because of invalid MongoDB ObjectId
    if (error.kind === "ObjectId") {
      // Send 400 Bad Request when ID format is wrong
      return res.status(400).json({
        message: "Invalid item ID format",
      });
    }

    // Handle all other unexpected server errors
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    // Find the cart of the logged-in user
    const cart = await Cart.findOne({ userId: req.user._id });

    // If cart does not exist, return 404 error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove all items from the cart
    cart.items = [];

    // Save updated cart in database
    await cart.save();

    // Send updated empty cart response
    res.json({
      userId: cart.userId,
      items: [],
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
