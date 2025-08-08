const mongoose = require('mongoose');
const Inventory = require('./models/Doctors');
require('dotenv').config();

const items = [
  {
    name: 'Dr. Anshul',
    department: 'Cardiology',
    qualifications: "MBBS",
  },
  {
    name: 'Dr. Ajaad',
    department: 'Dermatology',
    qualifications: "12th failed",
  },
  {
    name: 'Dr. Ajay',
    department: 'Pediaratrics',
    qualifications: "B.tech",
  },
  {
    name: 'Dr. Dev Rao',
    department: 'Orthopedics',
    qualifications: "M.tech",
  },
  {
    name: 'Dr. Angrag',
    department: 'Pharmaceuticals',
    qualifications: "PGI",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Inventory.deleteMany({});
    await Inventory.insertMany(items);
    console.log("✅ Seeded doctors Data");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();