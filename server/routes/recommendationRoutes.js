const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

/**
 * @route   GET /api/recommendations
 * @desc    Get personalized event recommendations from Ticketmaster
 * @access  Private
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const location = user.location || "Cape Town"; // Default location if none is set
    // const interests = user.preferences ? user.preferences.join(",") : "music,sports";

    const response = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        city: location,
        // keyword: interests,
        sort: "date,asc",
      },
    });
    console.log(`response`, response.data);

    if (!response.data || !response.data._embedded || !response.data._embedded.events) {
      return res.status(404).json({ message: "No events found" });
    }

    const events = response.data._embedded.events.map((event) => ({
      name: event.name,
      date: event.dates.start.localDate,
      location: event._embedded.venues[0].name || "Unknown",
      url: event.url,
    }));

    res.json(events);
  } catch (error) {
    console.error("Error fetching recommendations:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching recommendations", error: error.message });
  }
});

module.exports = router;
