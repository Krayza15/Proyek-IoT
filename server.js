// Polyfill Crypto untuk kompatibilitas MongoDB Driver
const crypto = require('crypto');
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const logRoutes = require('./routes/logRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/logs', logRoutes);
app.use('/api/schedules', scheduleRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Database'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Root Endpoint Test
app.get('/', (req, res) => {
  res.json({ message: 'Automatic Chicken Feeder API is Running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});