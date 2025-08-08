const queueData = [
  {
    id: "T001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    department: "Cardiology",
    appointmentTime: "09:30 AM",
    status: "waiting",
    priority: "normal",
    waitTime: "25 min",
    position: 3,
  },
  {
    id: "T002",
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    department: "Dermatology",
    appointmentTime: "10:00 AM",
    status: "in-progress",
    priority: "urgent",
    waitTime: "0 min",
    position: 1,
  },
  {
    id: "T003",
    name: "Amit Singh",
    phone: "+91 98765 43212",
    department: "Orthopedics",
    appointmentTime: "10:30 AM",
    status: "waiting",
    priority: "normal",
    waitTime: "45 min",
    position: 7,
  },
  {
    id: "T004",
    name: "Sunita Devi",
    phone: "+91 98765 43213",
    department: "Cardiology",
    appointmentTime: "11:00 AM",
    status: "completed",
    priority: "normal",
    waitTime: "15 min",
    position: 0,
  },
];

const departments = [
  { name: "Cardiology", current: 12, waiting: 8, avgWait: "20 min" },
  { name: "Dermatology", current: 8, waiting: 5, avgWait: "15 min" },
  { name: "Orthopedics", current: 15, waiting: 12, avgWait: "35 min" },
  { name: "Neurology", current: 6, waiting: 3, avgWait: "25 min" },
  { name: "Pediatrics", current: 18, waiting: 10, avgWait: "18 min" },
];

module.exports = { queueData, departments };