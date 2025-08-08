const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { queueData, departments } = require('./data');
const { Queue, Department } = require('./init');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Medicure');

    console.log("Connected to MongoDB");
}



// Home page (OPD Management)
app.get('/patients', async (req, res) => {
    let data = await Queue.find();
    console.log(data);
  res.render("index.ejs", { patients: data });
});


app.get('/patients/new', (req, res) => {
  res.render('newPatient.ejs');
});
app.post('/patients', async (req, res) => {
  let {name, phone, department, appointmentTime, status, priority, waitTime, position} = req.body;
  // Generate a unique id using timestamp
  let uniqueId = `T${Date.now()}`;
  let queue = new Queue({
    id: uniqueId,
    name,
    phone,
    department,
    appointmentTime,
    status,
    priority,
    waitTime,
    position
  });
  try {
    await queue.save();
    console.log("Patient added successfully");
    res.redirect('/patients');
  } catch (err) {
    console.error("Error adding patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Edit Patient
app.get('/patients/:id/edit', async (req, res) => {
  try {
    const patient = await Queue.findOne({ id: req.params.id });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    res.render('editPatient.ejs', { patient });
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Patient (PUT request)
app.put('/patients/:id', async (req, res) => {
  const { name, phone, department, appointmentTime, status, priority, waitTime, position } = req.body;
  try {
    await Queue.findOneAndUpdate(
      { id: req.params.id },
      { name, phone, department, appointmentTime, status, priority, waitTime, position },
      { new: true }
    );
    res.redirect('/patients');
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Patient
app.post('/patients/:id/delete', async (req, res) => {
  try {
    await Queue.deleteOne({ id: req.params.id });
    res.redirect('/patients');
  } catch (err) {
    console.error("Error deleting patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Departments routes
app.get('/departments', async (req, res) => {
  try {
    const data = await Department.find();
    res.render('departments.ejs', { departments: data });
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    }
);
