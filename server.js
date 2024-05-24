// backend/server.js
const express = require('express');
const db = require('./config/db'); // Ensure this line is added for importing db to use in models
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
