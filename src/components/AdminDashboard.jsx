import React, { useState } from 'react';
import ViewEvents from './ViewEvents';
import AddEvent from './AddEvent';
import ManageBookings from './ManageBookings';
import UserFeedback from './UserFeedback';

const AdminDashboard = () => {
  const [active, setActive] = useState('view');

  return (
    <div className="admin-panel p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4 space-x-2">
        <button onClick={() => setActive('view')}>View Events</button>
        <button onClick={() => setActive('add')}>Add New Event</button>
        <button onClick={() => setActive('bookings')}>Manage Bookings</button>
        <button onClick={() => setActive('feedback')}>User Feedback</button>
      </div>

      <div className="panel-content">
        {active === 'view' && <ViewEvents />}
        {active === 'add' && <AddEvent />}
        {active === 'bookings' && <ManageBookings />}
        {active === 'feedback' && <UserFeedback />}
      </div>
    </div>
  );
};

export default AdminDashboard;
