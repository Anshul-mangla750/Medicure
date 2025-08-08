const express = require('express');
const router = express.Router();
const Bed = require('../models/Bed');

// GET: Beds with filters
router.get('/', async (req, res) => {
  const { ward, status, search } = req.query;
  let query = {};

  if (ward && ward !== 'All') query.ward = ward;
  if (status && status !== 'All') query.status = status;
  if (search && search.trim() !== '') {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [
      { bedId: regex },
      { 'patient.name': regex },
      { doctor: regex },
      { room: regex }
    ];
  }

  const beds = await Bed.find(query);
  const total = beds.length;
  const occupied = beds.filter(b => b.status === 'occupied').length;
  const available = total - occupied;
  const occupancyRate = total > 0 ? Math.floor((occupied / total) * 100) : 0;

  res.render('beds', {
    beds,
    stats: { total, occupied, available, occupancyRate },
    filters: { ward: ward || 'All', status: status || 'All', search: search || '' }
  });
});

// POST: Allocate a bed
router.post('/allocate/:id', async (req, res) => {
  const { patientName, patientId, doctor, condition, dischargeDate } = req.body;

  await Bed.findByIdAndUpdate(req.params.id, {
    status: 'occupied',
    patient: { name: patientName, id: patientId },
    doctor,
    condition,
    admitDate: new Date(),
    dischargeDate
  });

  res.redirect('/beds');
});

// POST: Discharge a bed
router.post('/discharge/:id', async (req, res) => {
  await Bed.findByIdAndUpdate(req.params.id, {
    status: 'available',
    patient: {},
    doctor: "",
    condition: "",
    admitDate: null,
    dischargeDate: null
  });

  res.redirect('/beds');
});

module.exports = router;
