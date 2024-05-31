import React, { useState, useEffect } from 'react';
import { sendWebSocketMessage, subscribeToMessages } from '../api/websocket';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    subscribeToMessages((data) => {
      if (data.type === 'events') {
        setEvents(data.data);
      }
    });

    sendWebSocketMessage({ type: 'GET_EVENTS' });
  }, []);

  if (events.length === 0) {
    return <p>No events available</p>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {new Date(event.date).toLocaleString()}
            <button onClick={() => window.location.href=`/reserve/${event.id}`}>Reserve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
