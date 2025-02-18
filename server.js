// server.js (Main Server File)
const express = require('express');
const connect = require('./db');
const authRoutes = require('./auth');
require('dotenv').config();

const app = express();
connect();

app.use(express.json());
app.use('./auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));