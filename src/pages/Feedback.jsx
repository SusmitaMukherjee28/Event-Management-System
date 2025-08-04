// src/pages/Feedback.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/background.jpg'; // confetti background
import '../styles/FeedbackForm.css'; // make sure this file exists

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchFeedbacks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/feedback`);
      setFeedbacks(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('⚠ Please fill out all fields.');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/feedback`, { name, email, message });
      setFormData({ name: '', email: '', message: '' });
      setStatus('✅ Feedback submitted successfully!');
      fetchFeedbacks();
    } catch (error) {
      if (error.response) {
        setStatus(`❌ ${error.response.data.message || 'Failed to submit feedback.'}`);
      } else {
        setStatus('❌ Feedback submission failed. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/api/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
      setStatus('✅ Feedback deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
      setStatus('❌ Could not delete feedback. Please try again.');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div className="feedback-form-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="feedback-form-container">
        <h2 className="feedback-form-title">Leave Your Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Feedback"
            onChange={handleChange}
            rows="4"
            required
          />
          <button type="submit">Submit</button>
          {status && <p className="status-message">{status}</p>}
        </form>

        {feedbacks.length > 0 && (
          <ul className="feedback-list">
            {feedbacks.map((fb) => (
              <li key={fb.id} className="feedback-item">
                <strong>{fb.name}</strong> ({fb.email}): {fb.message}
                <br />
                <small>
                  {fb.created_at
                    ? new Date(fb.created_at.replace(' ', 'T')).toLocaleString()
                    : '📅 No timestamp available'}
                </small>
                <br />
                <button className="delete-button" onClick={() => handleDelete(fb.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
