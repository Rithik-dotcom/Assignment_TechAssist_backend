// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
  const { email, password, name, company } = req.body;

  User.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send('Server error: ' + err); // Include the error message
    if (user) return res.status(400).json({ message: 'User already exists' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Server error: ' + err); // Include the error message

      const newUser = { email, password: hashedPassword, name, company };
      User.createUser(newUser, (err, results) => {
        if (err) return res.status(500).send('Server error: ' + err); // Include the error message
        res.json({ message: 'User registered successfully' });
      });
    });
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send('Server error');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Server error');
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) return res.status(500).send('Server error');
        res.json({ token });
      });
    });
  });
};
