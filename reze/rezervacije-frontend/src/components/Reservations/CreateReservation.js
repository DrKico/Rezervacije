import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InteractiveMap from '../Map/InteractiveMap';

const CreateReservation = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [userId, setUserId] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [availableStanding, setAvailableStanding] = useState(40);
  const [availableSeats, setAvailableSeats] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleTableSelect = async (tableId) => {
    // Provjera da li je stol već rezerviran
    const response = await axios.get(`/api/reservations/table/${tableId}`);
    if (response.data.length > 0) {
      alert('This table is already reserved');
    } else {
      setTableNumber(tableId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        '/api/reservations',
        { tableNumber, numberOfGuests, userId, eventId },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Reservation created successfully');
      setTableNumber('');
      setNumberOfGuests('');
      setUserId('');
      setEventId('');
    } catch (error) {
      alert('Failed to create reservation');
    }
  };

  return (
    <div className="container">
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number of Guests"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
        <InteractiveMap onTableSelect={handleTableSelect} />
        <p>Selected Table: {tableNumber}</p>
        <button type="submit">Create Reservation</button>
      </form>
    </div>
  );
};

export default CreateReservation;
