const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: String,
  name: String,
  category: String,
  stock: Number,
  unit: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
