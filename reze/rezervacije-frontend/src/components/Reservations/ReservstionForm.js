import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendWebSocketMessage, subscribeToMessages } from '../api/websocket';

const ReservationForm = () => {
  const { eventId } = useParams();
  const [userId, setUserId] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendWebSocketMessage({
      type: 'CREATE_RESERVATION',
      payload: { userId, eventId, tableNumber, numberOfGuests }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div>
        <label>Table Number</label>
        <input type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
      </div>
      <div>
        <label>Number of Guests</label>
        <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} required />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
