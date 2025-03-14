const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads/" exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });

// Upload Route
router.post("/upload", upload.single("profileImage"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;