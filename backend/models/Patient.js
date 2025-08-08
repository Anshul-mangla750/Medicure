const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: String,
    dob: Date,
    gender: String,
    contactNumber: String,
    email: String,
    address: String,
    medications: String,
    allergies: String,
    pastConditions: String,
    documents: [String], // store file paths
    department: String,
    doctor: String,
    date: Date,
    time: String,
    emergency: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
