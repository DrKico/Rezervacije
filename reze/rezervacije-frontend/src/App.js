import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';
import Reservations from './components/Reservations/ReservationList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
