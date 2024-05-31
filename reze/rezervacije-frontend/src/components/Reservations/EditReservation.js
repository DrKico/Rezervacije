import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await axios.get(`/api/reservations/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      const reservation = response.data;
      setTableNumber(reservation.tableNumber);
      setNumberOfGuests(reservation.numberOfGuests);
    };
    fetchReservation();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `/api/reservations/${id}`,
        { tableNumber, numberOfGuests },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Reservation updated successfully');
      navigate('/reservations');
    } catch (error) {
      alert('Failed to update reservation');
    }
  };

  return (
    <div className="container">
      <h2>Edit Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Guests"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
};

export default EditReservation;
