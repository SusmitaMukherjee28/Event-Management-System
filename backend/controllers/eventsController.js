const db = require('../config/db');

// 📥 GET /api/events
exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// 📝 POST /api/events
exports.createEvent = async (req, res) => {
  const { name, date, location, description } = req.body;

  if (!name || !date || !location || !description) {
    return res.status(400).json({ error: 'Missing required event fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
      [name, date, location, description]
    );
    res.status(201).json({
      message: 'Event created successfully',
      eventId: result?.insertId || null
    });
  } catch (error) {
    console.error('❌ Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// 🔍 GET /api/events/:id
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error fetching event:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
