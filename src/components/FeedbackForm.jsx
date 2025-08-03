// src/components/FeedbackForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/background.jpg';
import '../styles/FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/feedback', formData);

      if (response.status === 200) {
        alert('✅ Feedback submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('❌ Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error submitting feedback:', error);
      alert('❌ Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="feedback-form-bg"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
    >
      <div className="feedback-form-wrapper">
        <div className="feedback-form-container">
          <h2 className="feedback-form-title">📬 Leave Your Feedback</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
