// server.js

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const eventsRoutes = require('./routes/events');
const feedbackRoutes = require('./routes/feedback');
const bookingsRoutes = require('./routes/bookings'); // ✅ Bookings route added

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());             // Allow frontend to talk to backend
app.use(express.json());     // Parse JSON request bodies

// ✅ API Routes
app.use('/api/events', eventsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/bookings', bookingsRoutes); // ✅ Mount booking routes

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🟢 Server live at http://localhost:${PORT}`);
});
