// backend/controllers/userController.js
const User = require('../models/User');

exports.profile = (req, res) => {
  const userId = req.user.id;

  User.findUserById(userId, (err, user) => {
    if (err) return res.status(500).send('Server error'+ err);
    if (!user) return res.status(404).json({ message: 'User not found'+ err });

    // Send user data without password
    const { password, ...userData } = user;
    res.json(userData);
  });
};
