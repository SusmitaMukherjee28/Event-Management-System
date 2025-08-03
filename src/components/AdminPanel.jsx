import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('background.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-40 backdrop-blur-md p-10 rounded-xl shadow-lg text-white w-[90%] max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className="bg-gray-800 px-5 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/admin/view-events')}
          >
            View Events
          </button>
          <button
            className="bg-gray-800 px-5 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/admin/add-event')}
          >
            Add New Event
          </button>
          <button
            className="bg-gray-800 px-5 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/admin/manage-bookings')}
          >
            Manage Bookings
          </button>
          <button
            className="bg-gray-800 px-5 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/admin/user-feedback')}
          >
            User Feedback
          </button>
        </div>

        <p className="mb-2">Welcome, Admin! Here you can manage the entire event system.</p>

        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>   
  );
};

export default AdminPanel;
