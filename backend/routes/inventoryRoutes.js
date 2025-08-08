const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// ✅ GET all + dashboard stats
router.get('/', async (req, res) => {
  const items = await Inventory.find().sort({ createdAt: -1 });

  const totalItems = items.length;
  const lowStockItems = items.filter(i => i.stock > 0 && i.stock <= 20).length;
  const outOfStockItems = items.filter(i => i.stock === 0).length;
  const recentAdditions = items.filter(i => i.createdAt >= new Date(Date.now() - 7 * 86400000)).length;

  res.render('inventory', {
    items,
    totalItems,
    lowStockItems,
    outOfStockItems,
    recentAdditions
  });
});

// ✅ GET Add form
router.get('/add', (req, res) => {
  res.render('inventory-add');
});

// ✅ POST Add item
router.post('/add', async (req, res) => {
  await Inventory.create(req.body);
  res.redirect('/inventory');
});

// ✅ GET Edit form
router.get('/edit/:id', async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  res.render('inventory-edit', { item });
});

// ✅ POST Edit item
router.post('/edit/:id', async (req, res) => {
  await Inventory.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/inventory');
});

// ✅ Delete item
router.post('/delete/:id', async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.redirect('/inventory');
});

module.exports = router;
