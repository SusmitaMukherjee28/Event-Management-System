import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg'; // ✅ Correct relative path

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/feedback')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error('Error fetching feedback:', err));
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-85 p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">📢 User Feedback</h2>
        <ul className="space-y-4">
          {feedbacks.map((fb, index) => (
            <li key={index} className="bg-white p-4 rounded-lg border shadow-sm">
              <p><strong>{fb.name}</strong> ({fb.email})</p>
              <p className="mt-2 text-gray-700">{fb.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFeedback;
