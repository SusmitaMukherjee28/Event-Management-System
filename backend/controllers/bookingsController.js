const db = require('../config/db');

// 📥 GET /api/bookings
exports.getAllBookings = (req, res) => {
  const sql = 'SELECT * FROM bookings';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// 📝 POST /api/bookings
exports.createBooking = (req, res) => {
  try {
    const {
      user_name,
      user_email,
      age,
      gender,
      tickets,
      event_name
    } = req.body;

    console.log('📦 Incoming booking:', req.body);

    if (
      !user_name?.trim() ||
      !user_email?.trim() ||
      !age ||
      !gender?.trim() ||
      !tickets ||
      !event_name?.trim()
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (tickets > 2) {
      return res.status(400).json({ error: 'Maximum 2 tickets allowed.' });
    }

    const sql = `
      INSERT INTO bookings 
        (user_name, user_email, age, gender, tickets, event_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      user_name.trim(),
      user_email.trim(),
      parseInt(age),
      gender.trim(),
      parseInt(tickets),
      event_name.trim()
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('❌ Error creating booking:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        id: result.insertId,
        message: 'Booking created successfully'
      });
    });
  } catch (error) {
    console.error('🔥 Unexpected server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
