const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    // return jwt token and expiry is 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide name, email, and password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create new user (password is hashed automatically via pre-save hook)
        const user = await User.create({ name, email, password });

        // Return user data with JWT token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// login user controller logic
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
