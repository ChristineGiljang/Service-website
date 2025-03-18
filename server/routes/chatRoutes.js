const express = require("express");
const Message = require("../models/messages");

const router = express.Router();

// 📌 Send a message (POST)
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get chat history between two users (GET)
router.get("/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [{ sender, receiver }, { sender: receiver, receiver: sender }],
    }).sort("createdAt");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
