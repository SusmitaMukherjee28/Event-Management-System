const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📨 POST feedback
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  console.log('📨 Incoming feedback:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const query = 'INSERT INTO feedback_table (name, email, message) VALUES (?, ?, ?)';

  db.query(query, [name.trim(), email.trim(), message.trim()], (err, result) => {
    if (err) {
      console.error('❌ Error saving feedback:', err);
      return res.status(500).json({ error: 'Database save failed' });
    }

    res.status(201).json({ message: '✅ Feedback submitted successfully' });
  });
});

// 📋 GET all feedback
router.get('/', (req, res) => {
  const query = 'SELECT * FROM feedback_table ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching feedback:', err);
      return res.status(500).json({ error: 'Database error while fetching feedback' });
    }

    res.status(200).json(results);
  });
});

// ❌ DELETE feedback by ID
router.delete('/:id', (req, res) => {
  const feedbackId = req.params.id;

  const query = 'DELETE FROM feedback_table WHERE id = ?';

  db.query(query, [feedbackId], (err, result) => {
    if (err) {
      console.error('❌ Error deleting feedback:', err);
      return res.status(500).json({ error: 'Database error while deleting feedback' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json({ message: '✅ Feedback deleted successfully' });
  });
});

module.exports = router;
