const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Auth Middleware
 * Protects routes by verifying JWT token from Authorization header
 * Attaches authenticated user object to req.user
 */
const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];

            // Verify token and decode user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by decoded ID and attach to request (exclude password)
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); // next middleware calling or route
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token invalid" });
        }
    }

    if (!token) {
        return res
            .status(401)
            .json({ message: "Not authorized, no token provided" });
    }
};

module.exports = protect;
