const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET all events
router.get('/', eventController.getAllEvents);

// GET a specific event by ID
router.get('/:id', eventController.getEventById);

// CREATE a new event
router.post('/add', eventController.createEvent);

// UPDATE an event by ID
router.put('/update/:id', eventController.updateEventById);

// DELETE an event by ID
router.delete('/delete/:id', eventController.deleteEventById);

module.exports = router;
