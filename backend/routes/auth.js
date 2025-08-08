const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET signup
router.get('/signup', (req, res) => {
  res.render('signup', { error: null, form: {} });
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password || !password2) {
      return res.render('signup', { error: 'All fields are required.', form: req.body });
    }
    if (password !== password2) {
      return res.render('signup', { error: "Passwords don't match.", form: req.body });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.render('signup', { error: 'Email already registered.', form: req.body });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    // login user immediately
    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Server error', form: req.body });
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.render('login', { error: 'Provide email and password' });

    const user = await User.findOne({ email });
    if (!user) return res.render('login', { error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Invalid credentials' });

    // success -> set session
    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Server error' });
  }
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

module.exports = router;
