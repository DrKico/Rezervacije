import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/create-event">Create Event</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/export-reservations">Export Reservations</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
