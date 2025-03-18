const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();


// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, shifts } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "employee", // Default role to "employee"
            shifts: shifts || [] // Default empty array if no shifts provided
        });

        // Save user to DB
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;


// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Protected route (only accessible with a valid token)
router.get("/protected", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
