import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg'; // ✅ correct relative path
import '../../styles/AddEvent.css'; // Optional extra styling

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: ''
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', eventData);
      alert('✅ Event added successfully');
    } catch (err) {
      alert('❌ Error adding event');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="add-event-form" style={{
        background: 'rgba(255,255,255,0.9)',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
      }}>
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={eventData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required />
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
          <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
          <input type="text" name="type" placeholder="Type (Music, Art...)" value={eventData.type} onChange={handleChange} required />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
