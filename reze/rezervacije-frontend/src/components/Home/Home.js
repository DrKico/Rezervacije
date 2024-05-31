import React, { useEffect, useState } from 'react';
import { sendWebSocketMessage, subscribeToMessages } from '../api/websocket';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    subscribeToMessages((data) => {
      if (data.type === 'EVENTS') {
        console.log('Events received:', data.events); // Add logging here
        setEvents(data.events);
      }
    });

    sendWebSocketMessage({ type: 'GET_EVENTS' });
  }, []);

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
