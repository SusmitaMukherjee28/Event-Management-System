// src/pages/admin/AdminFeedback.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg';
import '../../styles/AdminFeedback.css'; // Ensure this CSS file exists

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/feedback`);
        setFeedbacks(data);
      } catch (err) {
        console.error('Error loading feedback:', err);
      }
    };

    loadFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`${API_BASE}/api/feedback/${id}`);
        setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
      } catch (err) {
        console.error('Error deleting feedback:', err);
      }
    }
  };

  return (
    <div
      className="admin-feedback-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white', // ✅ Makes all text white
      }}
    >
      <div className="admin-feedback-container">
        <h2 className="admin-feedback-title">📬 User Feedback (Admin Panel)</h2>
        {feedbacks.length ? (
          feedbacks.map((fb) => (
            <div key={fb.id} className="admin-feedback-card">
              <strong>{fb.name}</strong> ({fb.email})
              <p>{fb.feedback || fb.message}</p>
              <small>
                {new Date(fb.created_at?.replace(' ', 'T')).toLocaleString()}
              </small>
              <br />
              <button className="delete-button" onClick={() => deleteFeedback(fb.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="admin-feedback-empty">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
