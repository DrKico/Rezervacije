import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleReservation = async () => {
    try {
      await axios.post(`http://localhost:5000/api/reservations`, {
        eventId: id,
        tableNumber: selectedTable,
        userName: form.name,
        userEmail: form.email,
      });
      alert('Reservation successful');
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Reservation failed');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.description}</p>
      <div>
        <h3>Select a table:</h3>
        <div>
          {[1, 2, 3, 4, 5, 6].map((table) => (
            <button
              key={table}
              onClick={() => setSelectedTable(table)}
              style={{ backgroundColor: selectedTable === table ? 'green' : 'red' }}
            >
              Table {table}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3>Fill in your details:</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default EventDetail;
