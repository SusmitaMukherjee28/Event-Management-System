import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg';
import '../../styles/ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/details');
        if (!Array.isArray(res.data)) throw new Error('Unexpected response format');
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err.message || err);
        setError(err.message || 'Unable to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/bookings/ticket-counts')
      .then(res => setTicketCounts(res.data))
      .catch(err => console.error('Error fetching ticket counts:', err));
  }, []);

  return (
    <div
      className="manage-bookings-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="manage-bookings-container">
        <h2 className="manage-bookings-title">📋 Manage Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <>
            <table className="manage-bookings-table w-full mb-8">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Tickets</th>
                  <th>Event Name</th>
                  <th>Event Time</th>
                  <th>Booking Time</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={b.id || index}>
                    <td>{b.user_name?.trim() || 'N/A'}</td>
                    <td>{b.user_email?.trim() || '—'}</td>
                    <td>{b.age || '—'}</td>
                    <td>{b.gender || '—'}</td>
                    <td>{b.tickets || 0}</td>
                    <td>{b.event_name || '—'}</td>
                    <td>{b.event_time || '—'}</td>
                    <td>
                      {b.booking_time
                        ? new Date(b.booking_time).toLocaleString()
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow max-w-md text-white">
              <h3 className="text-lg font-semibold mb-2">🎫 Total Tickets per Event</h3>
              {Object.keys(ticketCounts).length === 0 ? (
                <p>No ticket data available.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {Object.entries(ticketCounts).map(([event, count]) => (
                    <li key={event}>
                      <strong>{event}</strong>: {count} ticket(s)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
