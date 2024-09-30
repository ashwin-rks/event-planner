const express = require("express");
const { createEvent, getManagerEvents, deleteEvent, editEvent } = require('../controller/adminController');
const { authenticateToken, checkAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);
router.use(checkAdmin);

router.post('/create-event', createEvent)
router.get('/get-manager-events', getManagerEvents);
router.delete('/delete-event/:id', deleteEvent);
router.patch('/edit-event/:id', editEvent)

module.exports = router;