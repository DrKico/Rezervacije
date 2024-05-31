const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware('admin'), reservationController.createReservation);
router.get('/', authMiddleware('admin'), reservationController.getReservations);
router.get('/:id', authMiddleware('admin'), reservationController.getReservationById);
router.put('/:id', authMiddleware('admin'), reservationController.updateReservation);
router.delete('/:id', authMiddleware('admin'), reservationController.deleteReservation);

module.exports = router;
