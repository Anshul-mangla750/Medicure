const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

dotenv.config();


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// session
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    httpOnly: true,
    // secure: true  // enable when using HTTPS
  }
}));

// routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);





// MongoDB connection
connectDB();


app.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/dashboard');
  res.redirect('/auth/login');
});

// Routes
app.use('/beds', require('./routes/bedRoutes'));
app.use('/doctors', require('./routes/doctorsRoute'));
app.use('/appointments', require('./routes/appointments'));
app.use('/patients', require('./routes/patientRoutes'));
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/inventory', inventoryRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
