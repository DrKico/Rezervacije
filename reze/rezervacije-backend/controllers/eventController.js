const Event = require('../models/event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
    const { name, date, description, imageUrl } = req.body;
    try {
        const newEvent = await Event.create({ name, date, description, imageUrl });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
