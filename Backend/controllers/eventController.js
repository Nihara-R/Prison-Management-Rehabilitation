const Event = require('../models/Event');

// Controller function to get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a specific event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new event
const createEvent = async (req, res) => {
  const {
    eventName,
    category,
    date,
    time,
    organizer,
    targetAudience
  } = req.body;

  try {
    const event = new Event({
      eventName,
      category,
      date,
      time,
      organizer,
      targetAudience
    });

    const newEvent = await event.save();
    res.status(201).json({ message: 'Event added successfully', newEvent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update an event by ID
const updateEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update event details
    for (const key in req.body) {
      if (req.body[key] != null) {
        event[key] = req.body[key];
      }
    }

    const updatedEvent = await event.save();
    res.json({ message: 'Event updated', updatedEvent });
  } catch (err) {
    res.status(400).json({ message: 'Event update unsuccessful', error: err.message });
  }
};

// Controller function to delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById
};
