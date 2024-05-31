import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/events">Events</Link></li>
          {user && user.role === 'admin' && (
            <li><Link to="/create-event">Create Event</Link></li>
          )}
          <li><Link to="/reservations">Reservations</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
