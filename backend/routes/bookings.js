const express = require('express'); 
const router = express.Router();
const db = require('../config/db'); // ✅ DB connection

console.log('📦 bookings.js route file loaded');

// 🔍 Test route
router.get('/test', (req, res) => {
  res.json({ message: '✅ GET /api/bookings/test works!' });
});

// 📥 Basic GET all bookings
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

// ✅ GET all bookings with event details
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

// ✅ GET ticket count per event
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

// 📝 POST new booking
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

  // Basic sanitization and validation
  const ageNum = parseInt(age);
  const ticketsNum = parseInt(tickets);
  const eventIdNum = parseInt(event_id);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !eventIdNum ||
    !user_name?.trim() ||
    !user_email?.trim() ||
    !emailRegex.test(user_email) ||
    isNaN(ageNum) || ageNum < 1 ||
    !gender?.trim() ||
    isNaN(ticketsNum) || ticketsNum < 1 ||
    ticketsNum > 2 ||
    !event_name?.trim()
  ) {
    console.warn('⚠️ Validation failed:', req.body);
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  // Optional: Prevent duplicate booking for same email & event
  const checkSql = `
    SELECT * FROM bookings WHERE user_email = ? AND event_name = ?
  `;

  db.query(checkSql, [user_email.trim(), event_name.trim()], (checkErr, existing) => {
    if (checkErr) {
      console.error('❌ Error checking duplicates:', checkErr);
      return res.status(500).json({ error: 'Database check error' });
    }

    if (existing.length > 0) {
      console.log('⚠️ Duplicate booking detected');
      return res.status(409).json({ error: 'You have already booked this event' });
    }

    // Proceed to insert
    const insertSql = `
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

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('❌ Error inserting booking:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log(`✅ Booking inserted for: ${user_name} (${user_email})`);
      res.status(201).json({
        message: 'Booking successful',
        bookingId: result.insertId,
      });
    });
  });
});

module.exports = router;
