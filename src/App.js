import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Import Global Background CSS
import './App.css'; // <-- Add this line

// ✅ Shared Components
import Navbar from './components/NavBar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';

// ✅ Public User Route
import UserEvents from './pages/admin/UserEvents';

// ✅ Admin Pages
import AdminPanel from './pages/admin/AdminPanel';
import AddEvent from './pages/admin/AddEvent';
import ViewEvents from './pages/admin/ViewEvents';
import ManageBookings from './pages/admin/ManageBookings';
import AdminFeedback from './pages/admin/AdminFeedback';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<UserEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/manage-bookings" element={<ManageBookings />} />

          {/* Admin Routes */}
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route path="/admin/view-events" element={<ViewEvents />} />
          <Route path="/admin/manage-bookings" element={<ManageBookings />} />
          <Route path="/admin/view-feedback" element={<AdminFeedback />} />
          <Route path="/admin/panel" element={<AdminPanel />} />

          {/* Admin login */}
          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminPanel />
              ) : (
                <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
