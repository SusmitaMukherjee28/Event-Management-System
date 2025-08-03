import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';


const EventDetails = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual API route
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch event');
        }
        return res.json();
      })
      .then((data) => {
        setEventData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching event details:', err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading event details...</p>
      ) : eventData ? (
        <>
          <h2>{eventData.title}</h2>
          <p>{eventData.description}</p>
          {/* Pass the event object to the booking form */}
          <BookingForm selectedEvent={eventData} />
        </>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default EventDetails;
