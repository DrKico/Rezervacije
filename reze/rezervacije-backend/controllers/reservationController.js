const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    const { userId, eventId, tableNumber } = req.body;

    try {
        // Provera da li je već rezervisan stol za isti događaj
        const existingReservations = await Reservation.findAll({ where: { eventId, tableNumber } });
        if (existingReservations.length >= 2) {
            return res.status(400).json({ message: 'Table already fully booked for this event.' });
        }

        // Kreiranje nove rezervacije
        const reservation = await Reservation.create({ userId, eventId, tableNumber });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    const { userId, eventId, tableNumber } = req.body;

    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        reservation.userId = userId;
        reservation.eventId = eventId;
        reservation.tableNumber = tableNumber;
        await reservation.save();

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        await reservation.destroy();
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
