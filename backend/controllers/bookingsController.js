const db = require('../config/db');

// 📥 GET /api/bookings
exports.getAllBookings = (req, res) => {
  const sql = 'SELECT * FROM bookings ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results); // ✅ Explicitly set status 200
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

    // ✅ Validate inputs
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

    if (parseInt(tickets) > 2) {
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

    // ✅ Save to DB
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('❌ Error creating booking:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('✅ Booking saved with ID:', result.insertId);

      return res.status(201).json({
        success: true,
        id: result.insertId,
        message: 'Booking created successfully'
      });
    });
  } catch (error) {
    console.error('🔥 Unexpected server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
