const express = require("express");
const Service = require("../models/service");
const router = express.Router();

router.post("/create-service", async (req, res) => {
  try {
    const { name, description, skills, images, price, availability } = req.body;

    const newService = new Service({
      name,
      description,
      skills,
      images,
      price,
      availability,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
