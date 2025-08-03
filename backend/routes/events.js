const express = require('express');
const router = express.Router();
const db = require('../config/db');


// GET all events
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// ✅ POST new event
router.post('/', (req, res) => {
  const { title, description, date, time, location, type } = req.body;

  const sql = `
    INSERT INTO events (title, description, date, time, location, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, description, date, time, location, type], (err, result) => {
    if (err) {
      console.error('Error inserting event:', err);
      return res.status(500).json({ error: 'Failed to add event' });
    }
    res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
  });
});

module.exports = router;
