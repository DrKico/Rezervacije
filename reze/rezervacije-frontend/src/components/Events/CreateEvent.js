import React, { useState } from 'react';
import { sendWebSocketMessage, subscribeToMessages } from '/xampp/htdocs/reze/rezervacije-frontend/src/components/api/websocket';
const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendWebSocketMessage({
      type: 'CREATE_EVENT',
      name,
      date,
      description,
      imageUrl
    });
  };

  useEffect(() => {
    subscribeToMessages((data) => {
      if (data.type === 'EVENT_CREATED') {
        // Handle event creation success
        console.log('Event created:', data.event);
      }
    });
  }, []);

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;