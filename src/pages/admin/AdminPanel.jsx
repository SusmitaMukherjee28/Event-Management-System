import React from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/AdminPanel.css'; // adjust path if needed
import backgroundImage from '../../assets/background.jpg'; // ✅ Import your local image

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div
      className="admin-panel-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="admin-panel-container">
        <h2 className="admin-title">Admin Panel</h2>

        <div className="admin-options">
          <Link to="/admin/view-events" className="admin-btn">View Events</Link>
          <Link to="/admin/add-event" className="admin-btn">Add New Event</Link>
          <Link to="/admin/manage-bookings" className="admin-btn">Manage Bookings</Link>
          <Link to="/admin/view-feedback" className="admin-btn">User Feedback</Link>   
        </div>

        <div className="admin-info">
          <p>Welcome, Admin! Here you can manage the entire event system.</p>
        </div>

        <div className="mt-4">
          <button className="admin-btn back-home-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
