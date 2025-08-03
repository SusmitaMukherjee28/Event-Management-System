const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ✅ DB connection

console.log('📦 bookings.js route file loaded');

// 🔍 Test route to confirm router is active
router.get('/test', (req, res) => {
  res.json({ message: '✅ GET /api/bookings/test works!' });
});

// 📥 GET all bookings (basic)
router.get('/', (req, res) => {
  console.log('🔥 GET /api/bookings triggered');
  const sql = 'SELECT * FROM bookings';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ GET all bookings with full event details
router.get('/details', (req, res) => {
  console.log('🔥 GET /api/bookings/details triggered');
  const sql = `
    SELECT 
      b.id,
      b.user_name,
      b.user_email,
      b.age,
      b.gender,
      b.tickets,
      b.event_name,
      b.booking_time,
      e.date AS event_date,
      e.time AS event_time
    FROM bookings b
    JOIN events e ON b.event_name = e.title
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error joining bookings and events:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Total tickets booked per event
router.get('/ticket-counts', (req, res) => {
  console.log('🎟️ GET /api/bookings/ticket-counts triggered');
  const sql = `
    SELECT b.event_name, SUM(b.tickets) AS total_tickets
    FROM bookings b
    GROUP BY b.event_name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error getting ticket counts:', err);
      return res.status(500).json({ error: err.message });
    }

    const counts = {};
    results.forEach(row => {
      counts[row.event_name] = row.total_tickets;
    });

    res.json(counts);
  });
});

// 📝 POST a new booking
router.post('/', (req, res) => {
  console.log('📥 Booking received:', req.body);

  const {
    event_id,
    user_name,
    user_email,
    age,
    gender,
    tickets,
    event_name,
  } = req.body;

  const ageNum = parseInt(age);
  const ticketsNum = parseInt(tickets);
  const eventIdNum = parseInt(event_id);

  if (
    !eventIdNum ||
    !user_name?.trim() ||
    !user_email?.trim() ||
    !ageNum ||
    !gender?.trim() ||
    !ticketsNum ||
    !event_name?.trim()
  ) {
    console.warn('⚠️ Validation failed:', req.body);
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  if (ticketsNum > 2) {
    return res.status(400).json({ error: 'Maximum 2 tickets allowed per person' });
  }

  const sql = `
    INSERT INTO bookings (event_id, user_name, user_email, age, gender, tickets, event_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    eventIdNum,
    user_name.trim(),
    user_email.trim(),
    ageNum,
    gender.trim(),
    ticketsNum,
    event_name.trim(),
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'Booking successful',
      bookingId: result.insertId,
    });
  });
});

module.exports = router;
