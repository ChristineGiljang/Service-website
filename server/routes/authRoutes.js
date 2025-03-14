const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();

// 🔐 Signup
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body); // ✅ Debugging log
    const { username, email, address, password } = req.body;

    if (!username || !email || !address || !password) {
      console.log("Missing fields:", { username, email, address, password }); // ✅ Log missing fields
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, address, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email, password);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found!");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token (if applicable)
    const token = "your_generated_token_here"; // Replace with JWT logic if needed

    console.log("Login successful! Sending user data.");
    res.json({
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
