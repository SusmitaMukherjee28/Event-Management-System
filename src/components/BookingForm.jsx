import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookingForm.css';
import qrImage from '../assets/dummy-qr.png';

const BookingForm = ({ selectedEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    tickets: 1
  });

  useEffect(() => {
    console.log("Selected Event:", selectedEvent);
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit ticket count to max 2
    if (name === "tickets" && value > 2) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedEvent.id || !selectedEvent.title) {
      alert("Event data is missing!");
      return;
    }

    const bookingData = {
      user_name: formData.name,
      user_email: formData.email,
      age: parseInt(formData.age),
      gender: formData.gender,
      tickets: parseInt(formData.tickets),
      event_id: selectedEvent.id,
      event_name: selectedEvent.title,
    };

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert("Booking successful! See you in the Event 🎉");

      // Optional: reset form
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: '',
        tickets: 1
      });
    } catch (err) {
      console.error("Booking failed:", err.response?.data?.error || err.message);
      alert("Booking failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="booking-form-container">
      <h4>Book Your Ticket</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          required
          onChange={handleChange}
        />
        <select
          name="gender"
          value={formData.gender}
          required
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="tickets"
          placeholder="Number of Tickets"
          value={formData.tickets}
          min={1}
          max={2}
          required
          onChange={handleChange}
        />
        <button type="submit">Book Now</button>
      </form>

      <div className="qr-payment text-center mt-4">
        <p><strong>Scan to Pay</strong></p>
        <img src={qrImage} alt="QR Code" style={{ width: '200px' }} />
      </div>
    </div>
  );
};

export default BookingForm;
