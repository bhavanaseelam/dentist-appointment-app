const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  date: String,
  dentistName: String,
  clinicName: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);