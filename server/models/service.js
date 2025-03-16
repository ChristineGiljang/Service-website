const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  images: { type: [String]}, // Store image URLs
  price: { type: Number, required: true },
  availability: { type: Object, required: true }, // Availability schedule
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
