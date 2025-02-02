const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const bidsRoutes = require('./routes/bids');
const paymentsRoutes = require('./routes/payments');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/bids', bidsRoutes);
app.use('/api/payments', paymentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
