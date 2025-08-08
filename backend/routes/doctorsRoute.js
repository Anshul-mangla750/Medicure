const express = require('express');
const router = express.Router();
const Doctors = require('../models/Doctors');

// ✅ GET all + dashboard stats
router.get('/', async (req, res) => {
  const items = await Doctors.find().sort({ createdAt: -1 });

  const totalItems = items.length;

  res.render('doctors', {
    items,
    totalItems,
  });
});

// ✅ GET Add form
router.get('/add', (req, res) => {
  res.render('doctors-add');
});

// ✅ POST Add item
router.post('/add', async (req, res) => {
  await Doctors.create(req.body);
  res.redirect('/doctors');
});

// ✅ GET Edit form
router.get('/edit/:id', async (req, res) => {
  const item = await Doctors.findById(req.params.id);
  res.render('editDoctors', { item });
});

// ✅ POST Edit item
router.post('/edit/:id', async (req, res) => {
  await Doctors.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/doctors');
});

// ✅ Delete item
router.post('/delete/:id', async (req, res) => {
  await Doctors.findByIdAndDelete(req.params.id);
  res.redirect('/doctors');
});

module.exports = router;
