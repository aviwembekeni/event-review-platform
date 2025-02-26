const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Event (Only for event creators & admins)
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const user = req.user; // Retrieved from authMiddleware

    // Check if the user is allowed to create events
    if (user.role !== 'event_creator' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Only event creators and admins can create events' });
    }

    // Create the event
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      createdBy: user._id, // Store the user ID as the creator
    });

    await newEvent.save();

    // Add event to user's createdEvents list
    user.createdEvents.push(newEvent._id);
    await user.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.get('/', async (req, res) => {
//   const events = await Event.find();
//   res.json(events);
// });

// Update Event (Only event creator or admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator or an admin can edit
    if (event.createdBy !== req.user._id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to edit this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Event (Only event creator or admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator or an admin can delete
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
     
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;