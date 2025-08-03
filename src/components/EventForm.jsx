import React from 'react';

const EventForm = () => (
  <form className="mt-4">
    <div className="mb-3">
      <label className="form-label">Event Title</label>
      <input type="text" className="form-control" />
    </div>

    <div className="mb-3">
      <label className="form-label">Date</label>
      <input type="date" className="form-control" />
    </div>

    <div className="mb-3">
      <label className="form-label">Location</label>
      <input type="text" className="form-control" />
    </div>

    <button type="submit" className="btn btn-primary">Add Event</button>
  </form>
);

export default EventForm;
