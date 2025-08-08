const mongoose = require('mongoose');
const { queueData} = require('./data');
const {departments} = require('./data');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Medicure');

    console.log("Connected to MongoDB");
}


const queueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Add this line
  name: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, enum: ['waiting', 'in-progress', 'completed'], required: true },
  priority: { type: String, enum: ['normal', 'urgent'], required: true },
  waitTime: { type: String, required: true },
  position: { type: Number, required: true }
});

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  current: { type: Number, required: true },
  waiting: { type: Number, required: true },
  avgWait: { type: String, required: true }
});
const Queue = mongoose.model('Queue', queueSchema);
const Department = mongoose.model('Department', departmentSchema);

async function initDatabase() {
    await Queue.deleteMany({});
    await Department.deleteMany({});
    
    await Queue.insertMany(queueData);
    await Department.insertMany(departments);
    
    console.log("Database initialized with sample data");
    }

initDatabase().then(() => {
    console.log("Initialization complete");
   
}
).catch(err => {
    console.error("Error initializing database:", err);
  
});
module.exports = { Queue, Department };