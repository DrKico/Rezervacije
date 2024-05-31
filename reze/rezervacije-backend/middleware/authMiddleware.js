const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).send('Access denied');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (role && role !== decoded.role) {
                return res.status(403).send('Access denied');
            }

            next();
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    };
};

module.exports = authMiddleware;
