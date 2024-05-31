import React from 'react';

const EventDetail = ({ event }) => {
  return (
    <div className="container">
      <h2>{event.name}</h2>
      <img src={event.imageUrl} alt={event.name} style={{ width: '100%', height: 'auto' }} />
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;
