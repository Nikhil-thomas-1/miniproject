const { v4: uuidv4 } = require("uuid"); // For unique random IDs
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: { type: String, default: uuidv4, unique: true }, // Random Unique ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "employee"], default: "employee" }, // Role Field
    workingHours: [
        {
            day: { type: String, required: true }, // e.g., "Monday"
            hours: { type: String, required: true } // e.g., "9:00AM-5:00PM"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
