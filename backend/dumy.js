const mongoose = require('mongoose');
const Bed = require('./models/Bed');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.log("Connection error", err);
});

const wards = ['ICU', 'General Ward', 'OPD'];
const doctors = ['Dr. Mehta', 'Dr. Sen', 'Dr. Roy', 'Dr. Rathi', 'Dr. Sharma', 'Dr. Kumar'];
const conditions = ['Stable', 'Critical'];

const generateBeds = () => {
  const beds = [];

  for (let i = 1; i <= 40; i++) {
    const ward = wards[i % 3]; // Rotate between ICU, General Ward, OPD
    const bedId = `${ward.split(' ')[0].toUpperCase()}-${String(i).padStart(3, '0')}`;
    const floor = ward === 'ICU' ? '2nd' : ward === 'General Ward' ? '1st' : 'Ground';
    const room = `${ward[0]}-${100 + i}`;

    const isOccupied = i % 3 === 0 || i % 7 === 0; // Randomly occupy some beds

    const bed = {
      bedId,
      ward,
      floor,
      room,
      status: isOccupied ? 'occupied' : 'available',
    };

    if (isOccupied) {
      const patientId = `P10${i}`;
      bed.patient = { name: `Patient ${i}`, id: patientId };
      bed.doctor = doctors[i % doctors.length];
      bed.condition = conditions[i % conditions.length];
      bed.admitDate = new Date(`2025-08-${(i % 28) + 1}`);
      bed.dischargeDate = new Date(`2025-08-${(i % 28) + 3}`);
    }

    beds.push(bed);
  }

  return beds;
};

async function seedDB() {
  await Bed.deleteMany({});
  await Bed.insertMany(generateBeds());
  console.log("✅ 40+ Beds inserted successfully!");
  mongoose.connection.close();
}

seedDB();

// const mongoose = require('mongoose');
// const Inventory = require('./models/Inventory');
// require('dotenv').config();

// const items = [
//   {
//     itemId: 'MED-001',
//     name: 'N95 Respirator Masks',
//     category: 'Medical Consumables',
//     stock: 150,
//     unit: 'pcs',
//   },
//   {
//     itemId: 'EQU-005',
//     name: 'Digital Thermometer',
//     category: 'Medical Devices',
//     stock: 25,
//     unit: 'pcs',
//   },
//   {
//     itemId: 'PHM-012',
//     name: 'Paracetamol 500mg',
//     category: 'Pharmaceuticals',
//     stock: 500,
//     unit: 'blister packs',
//   },
//   {
//     itemId: 'EQU-010',
//     name: 'Blood Pressure Monitor',
//     category: 'Medical Devices',
//     stock: 5,
//     unit: 'pcs',
//   },
//   {
//     itemId: 'PHM-020',
//     name: 'Amoxicillin 250mg',
//     category: 'Pharmaceuticals',
//     stock: 0,
//     unit: 'bottles',
//   },
// ];

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     await Inventory.deleteMany({});
//     await Inventory.insertMany(items);
//     console.log("✅ Seeded Inventory Data");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seed();
