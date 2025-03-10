const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();

// 🔐 Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// 🔑 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email, password); // ✅ Debug

    const user = await User.findOne({ email });
    console.log("User found:", user); // ✅ Debugging log

    if (!user) {
      console.log("User not found!");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Login successful! Sending username:", user.username);
    res.json({ username: user.username, email: user.email, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
