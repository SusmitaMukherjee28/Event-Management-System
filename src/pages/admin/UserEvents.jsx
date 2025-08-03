import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import '../../styles/UserEvents.css'; // ✅ Import CSS
import backgroundImage from '../../assets/background.jpg';

const UserEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched user events:', data);
        setEvents(data);
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <div
      className="user-events-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="user-events-container">
        <h2 className="user-events-heading">🎉 Upcoming Festivals & Events</h2>

        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} showBooking={true} />
          ))
        ) : (
          <p className="user-events-empty">No events available or still loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
