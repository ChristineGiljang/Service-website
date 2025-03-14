require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const connectDB = require("./config/db");
const userInfoRoutes = require("./routes/userInfoRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json({ limit: '10mb' })); // Increase limit (default is 100kb)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/user", userInfoRoutes); 
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
