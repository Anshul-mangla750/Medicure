const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Patient = require('../models/Patient');


// GET all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.render('patientList', { patients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching patients');
    }
});

// GET form
router.get('/add', (req, res) => {
    res.render('patientForm');
});

// POST form data
router.post('/add', upload.array('documents', 5), async (req, res) => {
    try {
        const files = req.files.map(file => file.path);

        const newPatient = new Patient({
            fullName: req.body.fullName,
            dob: req.body.dob,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            address: req.body.address,
            medications: req.body.medications,
            allergies: req.body.allergies,
            pastConditions: req.body.pastConditions,
            documents: files,
            department: req.body.department,
            doctor: req.body.doctor,
            date: req.body.date,
            time: req.body.time,
            emergency: req.body.emergency === 'on'
        });

        await newPatient.save();
        res.redirect('/patients');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving patient data');
    }
});

module.exports = router;
