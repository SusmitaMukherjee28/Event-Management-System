import React from 'react';
import EventCard from './EventCard'; // ✅ import your reusable component
import '../styles/EventList.css';

const events = [
  { id: 1, title: 'Tech Meetup', date: '2025-07-20', location: 'Kolkata' },
  { id: 2, title: 'Music Fest', date: '2025-08-05', location: 'Delhi' },
  { id: 3, title: 'Food Carnival', date: '2025-08-25', location: 'Mumbai' },
  { id: 4, title: 'Art Carnival', date: '2026-01-25', location: 'Delhi' },
   { id: 5, title: 'Theater Performance', date: '2026-01-30', location: 'Kolkata' },
   {id :6, title : 'Comedy Night', date: '2025-08-25', location: 'Delhi'	},
   {id :7, title : 'Eco Fair', date: '2025-10-05', location: 'Pune Riverside Grounds'	},
];

const EventList = () => {
  return (
    <div className="event-grid container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
