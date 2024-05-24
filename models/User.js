// backend/models/User.js
const db = require('../config/db');

const createUser = (userData, callback) => {
  const { email, password, name, company } = userData;
  const sql = 'INSERT INTO users (email, password, name, company) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, password, name, company], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results[0]);
  });
};

const findUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results[0]);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
