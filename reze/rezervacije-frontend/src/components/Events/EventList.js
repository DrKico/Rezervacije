import React, { useEffect, useState } from 'react';
import { sendWebSocketMessage, subscribeToMessages } from  '/xampp/htdocs/reze/rezervacije-frontend/src/components/api/websocket';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    subscribeToMessages((message) => {
      console.log('Message received:', message);
      if (message.type === 'events') {
        setEvents(message.data);
      }
    });

    sendWebSocketMessage({ type: 'GET_EVENTS' });
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventList;