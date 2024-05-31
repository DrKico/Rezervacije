import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const ExportReservations = () => {
  const [eventId, setEventId] = useState('');

  const handleExport = async () => {
    try {
      const response = await axios.get(`/api/reservations/export/${eventId}`, { responseType: 'blob' });
      saveAs(response.data, `reservations-${eventId}.xlsx`);
    } catch (error) {
      alert('Failed to export reservations');
    }
  };

  return (
    <div className="container">
      <h2>Export Reservations</h2>
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default ExportReservations;
