const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  service: String,
  description: String,
  address: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);