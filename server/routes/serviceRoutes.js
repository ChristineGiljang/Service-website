const express = require("express");
const Service = require("../models/service"); // Ensure this model includes 'availability'
const ServiceRequest = require("../models/serviceRequest");
const router = express.Router();

// Create Service Route
router.post("/create-service", async (req, res) => {
  try {
    const { userId, name, description, location, skills, images, price, availability } = req.body;

    const newService = new Service({
      userId,
      name,
      description,
      location,
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

// Get Availability by User ID Route
router.get("/availability/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userAvailability = await Service.findOne({ userId });

    if (!userAvailability) {
      return res.status(404).json({ error: "No availability found" });
    }

    res.json(userAvailability.availability); // Send availability data
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRequest = new ServiceRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Service request saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving request" });
  }
});

// @route   GET /api/service-request
// @desc    Get all service requests
router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching requests" });
  }
});


module.exports = router;
