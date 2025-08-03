import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
    <ul className="space-y-4">
      <li><Link to="/admin/view-events">📅 View Events</Link></li>
      <li><Link to="/admin/add-event">➕ Add New Event</Link></li>
      <li><Link to="/admin/manage-bookings">📋 Manage Bookings</Link></li>
      <li><Link to="/admin/user-feedback">💬 User Feedback</Link></li>
    </ul>
  </div>
);

export default AdminDashboard;
