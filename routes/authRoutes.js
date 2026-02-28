const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

/**
 * Auth Routes
 * POST /api/register - Register a new user
 * POST /api/login    - Login and get JWT token
 */
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
