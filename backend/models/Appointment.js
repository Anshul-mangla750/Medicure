// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    department: String,
    date: String,
    time: String,
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
