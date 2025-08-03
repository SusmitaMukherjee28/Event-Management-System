import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard'; // ✅ Make sure the path is correct
import backgroundImage from '../../assets/background.jpg'; // ✅ Import background image
import '../../styles/ViewEvents.css'; // ✅ Custom styling for section titles etc.

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched events:', data);
        setEvents(data);
      })
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div
      className="admin-events-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '40px',
      }}
    >
      <h2 className="section-title">
        <i className="fas fa-calendar-alt"></i> Upcoming Events
      </h2>

      {Array.isArray(events) && events.length > 0 ? (
        events.map(event => (
          <EventCard key={event.id} event={event} showBooking={false} />
        ))
      ) : (
        <p style={{ color: '#fff' }}>No events available or still loading...</p>
      )}
    </div>
  );
};

export default ViewEvents;
