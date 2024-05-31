const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', eventController.getEvents);
router.post('/', authMiddleware('admin'), eventController.createEvent);

module.exports = router;
