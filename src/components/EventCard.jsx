import React, { useState } from 'react';
import '../styles/EventCard.css';
import BookingForm from './BookingForm';
import cardBackground from '../assets/background.jpg'; // ✅ Add background image

const EventCard = ({ event, showBooking = true }) => {
  const [showForm, setShowForm] = useState(false);
  const eventDate = new Date(event.date);

  return (
    <div
      className="event-card"
      style={{
        backgroundImage: `url(${cardBackground})`
      }}
    >
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {eventDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Location:</strong> {event.location}</p>
       

        {showBooking && (
          !showForm ? (
            <button className="event-card-btn" onClick={() => setShowForm(true)}>Book Now</button>
          ) : (
            <>
              <BookingForm selectedEvent={event} />
              <button className="event-card-btn cancel" onClick={() => setShowForm(false)}>Cancel</button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default EventCard;
