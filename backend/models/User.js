const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "employee"], default: "employee" }, 
    shifts: [
        {
            day: { type: String, required: true }, // e.g., "Monday"
            startTime: { type: String, required: true }, // e.g., "09:00 AM"
            endTime: { type: String, required: true } // e.g., "05:00 PM"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
