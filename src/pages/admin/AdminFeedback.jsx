import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg';
import '../../styles/AdminFeedback.css'; // Optional custom styles

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
  }, [API_BASE]); // ✅ Added to fix the warning

  return (
    <div
      className="admin-feedback-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
      }}
    >
      <div className="admin-feedback-container bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">📬 User Feedback</h2>
        {feedbacks.length ? (
          feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white text-black p-4 mb-4 rounded-lg border shadow-md"
            >
              <strong>{fb.name}</strong> ({fb.email})
              <p className="mt-2">{fb.feedback || fb.message}</p>
              <small className="text-gray-600">
                {fb.created_at && new Date(fb.created_at.replace(' ', 'T')).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
