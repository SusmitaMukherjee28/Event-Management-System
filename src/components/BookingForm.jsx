import React, { useState } from 'react';

const BookingForm = ({ selectedEvent }) => {
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Optional: set default gender like 'Male'
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user_name.trim() || !user_email.trim() || !age || !gender.trim()) {
      window.alert('Please fill in all fields.');
      return;
    }

    if (!selectedEvent?.id || !selectedEvent?.title) {
      window.alert('No valid event selected.');
      return;
    }

    const bookingData = {
      event_id: Number(selectedEvent.id),
      user_name: user_name.trim(),
      user_email: user_email.trim(),
      age: Number(age),
      gender: gender.trim(),
      tickets: 1,
      event_name: selectedEvent.title.trim(),
    };

    console.log('📤 Sending bookingData:', bookingData);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const contentType = res.headers.get('content-type');
      const isJSON = contentType?.includes('application/json');
      const data = isJSON ? await res.json() : await res.text();

      if (res.status === 201) {
        window.alert('🎉 Booking successful! See you at the event!');
        setUserName('');
        setUserEmail('');
        setAge('');
        setGender('');
      } else {
        const errorMsg = typeof data === 'string' ? data : data.error;
        window.alert(`⚠️ Error: ${errorMsg || 'Unexpected server response'}`);
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      window.alert('🚨 Failed to book. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <form onSubmit={handleBookingSubmit} autoComplete="off">
        <h2>Book Event: {selectedEvent?.title ?? 'No event selected'}</h2>

        <label>
          Name:
          <input
            type="text"
            placeholder="Name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={user_email}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="1"
          />
        </label>

        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
