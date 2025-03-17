const express = require("express");
const multer = require("multer");
const User = require("../models/users"); // Ensure this is the correct model
const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store files in 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// File Upload Middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        } else {
            return cb(new Error("Only .jpg, .jpeg, .png formats allowed"));
        }
    }
});

// Upload Route (Handles Image Upload)
router.post("/upload", upload.single("profileImage"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ✅ Fetch User Info (Use `router.get`)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Update User Info
router.put("/:id", async (req, res) => {
    const { username, email, profileImage } = req.body; 
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { username, email, profileImage }, 
            { new: true, upsert: true }
        );
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user info", error });
    }
});

module.exports = router;
