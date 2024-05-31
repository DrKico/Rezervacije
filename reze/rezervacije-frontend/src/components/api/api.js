import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const registerUser = (userData) => {
    socket.emit('register', userData);
};

export const loginUser = (userData) => {
    socket.emit('login', userData);
};

export const createEvent = (eventData) => {
    socket.emit('createEvent', eventData);
};

export const createReservation = (reservationData) => {
    socket.emit('createReservation', reservationData);
};

export const getEvents = (callback) => {
    socket.on('events', callback);
    socket.emit('getEvents');
};

export const getReservations = (callback) => {
    socket.on('reservations', callback);
    socket.emit('getReservations');
};
