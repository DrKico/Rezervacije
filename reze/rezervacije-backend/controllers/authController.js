const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, email, firstName, lastName, phone, birthDate, role } = req.body;

    if (new Date().getFullYear() - new Date(birthDate).getFullYear() < 18) {
        return res.status(400).json({ message: 'You must be at least 18 years old to register.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email, firstName, lastName, phone, birthDate, role });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Directly comparing the password from the request to the password stored in the database
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Changed to log error message only
    }
};
