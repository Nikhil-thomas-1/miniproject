const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
