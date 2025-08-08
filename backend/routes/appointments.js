const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctors");
const Appointment = require("../models/Appointment");

// Show Appointment Page
router.get("/", async (req, res) => {
    const doctors = await Doctor.find();
    const appointments = await Appointment.find().populate("doctor");
    res.render("appointments", { doctors, appointments });
});

// Book Appointment
router.post("/book", async (req, res) => {
    const { doctorId, department, date, time } = req.body;
    await Appointment.create({ doctor: doctorId, department, date, time, status: "Confirmed" });
    res.redirect("/appointments");
});

// Cancel
router.post("/cancel/:id", async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect("/appointments");
});

// Reschedule
router.post("/reschedule/:id", async (req, res) => {
    const { date, time } = req.body;
    await Appointment.findByIdAndUpdate(req.params.id, { date, time });
    res.redirect("/appointments");
});

module.exports = router;
