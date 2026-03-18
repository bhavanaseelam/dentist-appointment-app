const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import model
const Appointment = require("./models/Appointment");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/dentistDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});


// ✅ GET API (for Admin Panel)
app.get("/api/appointments", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
});


// ✅ POST API (with duplicate check)
app.post("/api/appointments", async (req, res) => {
  try {
    const { patientName, date, dentistName } = req.body;

    // 🔍 Check duplicate
    const existing = await Appointment.findOne({
      patientName,
      date,
      dentistName
    });

    if (existing) {
      return res.status(400).json({
        message: "Appointment already exists for this doctor on this date"
      });
    }

    // ✅ Save new appointment
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    res.json({ message: "Appointment saved successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error saving appointment" });
  }
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});