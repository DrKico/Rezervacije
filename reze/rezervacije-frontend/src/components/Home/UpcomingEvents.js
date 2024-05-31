import React, { useState, useEffect } from 'react';
import { socket, sendWebSocketMessage, subscribeToMessages } from '../api/websocket';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      if (data.type === 'events') {
        setEvents(data.data.slice(0, 3)); // Get the first 3 events
      }
    };

    subscribeToMessages(handleMessage);
    sendWebSocketMessage({ type: 'GET_EVENTS' });

    return () => {
      socket.removeEventListener('message', handleMessage); // Cleanup
    };
  }, []);

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.imageUrl || 'https://via.placeholder.com/150'} alt={event.name} />
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <button onClick={() => window.location.href=`/reserve/${event.id}`}>Reserve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
