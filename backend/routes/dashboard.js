const express = require('express');
const router = express.Router();

// middleware to protect routes
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/auth/login');
  next();
}

router.get('/', requireAuth, (req, res) => {
  res.render('dashboard', { name: req.session.userName });
});

module.exports = router;
