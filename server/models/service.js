const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  skills: { type: [String], required: true },
  images: { type: [String]}, // Store image URLs
  price: { type: Number, required: true },
  availability: {
    Monday: [{ start: String, end: String }],
    Tuesday: [{ start: String, end: String }],
    Wednesday: [{ start: String, end: String }],
    Thursday: [{ start: String, end: String }],
    Friday: [{ start: String, end: String }],
    Saturday: [{ start: String, end: String }],
    Sunday: [{ start: String, end: String }]
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
