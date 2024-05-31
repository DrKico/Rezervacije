import React, { useEffect, useState } from 'react';
import { sendWebSocketMessage, subscribeToMessages } from '../api/websocket';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    subscribeToMessages((data) => {
      if (data.type === 'reservations') {
        setReservations(data.reservations);
      }
    });

    sendWebSocketMessage({ type: 'fetchReservations' });
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p>{reservation.userId}</p>
            <p>{reservation.eventId}</p>
            <p>{new Date(reservation.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
