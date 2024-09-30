const express = require("express");
const { authenticateToken } = require('../middleware/authMiddleware');
const { getUserDetails, getUserBookings, bookEvent, getAllEvents, getAllUnbookedEvents, getFilteredUnbookedEvents } = require('../controller/userController');

const router = express.Router();

router.use(authenticateToken);
router.get('/get-user-details', getUserDetails);
router.get('/get-user-bookings', getUserBookings);
router.post('/book-event/:id', bookEvent);
router.get('/get-all-events', getAllEvents);
router.get('/get-unbooked-events', getAllUnbookedEvents);
router.get('/get-filtered-events/:eventType', getFilteredUnbookedEvents);

module.exports = router;