import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ auth, setAuth }) => {
  const handleLogout = () => {
    setAuth(null);
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {auth ? (
          <>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
