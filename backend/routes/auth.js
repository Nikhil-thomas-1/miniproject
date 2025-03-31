const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const Alert = require("../models/alert");
require("dotenv").config();

const router = express.Router();

// Get all users (Admin only)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});




// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, workingHours } = req.body;

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
            workingHours: workingHours || [] // Default empty array if no shifts provided
        });

        // Save user to DB
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // 2. Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Check working hours (skip for admin users)
        if (user.role !== 'admin') {
            const now = new Date();
            const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
            const currentTime = now.getHours() * 60 + now.getMinutes();

            const todayShift = user.workingHours.find(shift => shift.day === currentDay);
            
            if (!todayShift || !isWithinShift(todayShift.hours, currentTime)) {
                const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                await Alert.create({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    reason: `Login attempt outside working hours (Current time: ${now.toLocaleTimeString()})`,
                    attemptedAt: now,
                    ipAddress: ipAddress
                });

                return res.status(403).json({ 
                    message: "Access denied: Outside working hours",
                    allowedHours: todayShift ? todayShift.hours : "No shift scheduled for today"
                });
            }
        }

        // 4. Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ 
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                workingHours: user.workingHours
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Updated shift checker (handles overnight shifts)
function isWithinShift(shiftHours, currentTime) {
    const [startStr, endStr] = shiftHours.split('-');
    
    const parseTime = (timeStr) => {
        const [_, hh, mm, period] = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/i) || [];
        let hours = parseInt(hh);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + (parseInt(mm) || 0);
    };

    const shiftStart = parseTime(startStr);
    const shiftEnd = parseTime(endStr);

    // Handle overnight shift (e.g. 21:00-6:00 → 9PM-6AM)
    if (shiftEnd < shiftStart) {
        return currentTime >= shiftStart || currentTime <= shiftEnd;
    }
    // Normal daytime shift
    return currentTime >= shiftStart && currentTime <= shiftEnd;
}

// Update existing user
router.put("/users/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, workingHours } = req.body;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Authorization check (only admin or same user can update)
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: "Unauthorized to update this user" });
        }

        // Update fields
        if (name) user.name = name;
        
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (role && req.user.role === 'admin') { // Only admin can change roles
            user.role = role;
        }

        if (workingHours) {
            user.workingHours = workingHours;
        }

        await user.save();
        
        res.json({ 
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                workingHours: user.workingHours
            }
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Server error",
            error: error.message
        });
    }
})


// Protected route (only accessible with a valid token)
router.get("/protected", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token"); // Clear JWT cookie if using cookies
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
