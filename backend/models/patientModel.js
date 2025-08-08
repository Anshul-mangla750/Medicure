const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: String,
    dob: Date,
    gender: String,
    contactNumber: String,
    email: String,
    address: String,
    medicalHistory: {
        medications: String,
        allergies: String,
        pastConditions: String
    },
    documents: [String],
    appointment: {
        department: String,
        doctor: String,
        date: Date,
        time: String
    },
    emergency: Boolean
});

module.exports = mongoose.model('Patient', patientSchema);
