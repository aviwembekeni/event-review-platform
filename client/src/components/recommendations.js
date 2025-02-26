import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import { Navigation } from "swiper";

const Recommendations = () => {
  const [events, setEvents] = useState([]);
  const [ratings, setRatings] = useState({}); // Store event ratings
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("/api/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [token]);

  // Function to format the date for Google Calendar
  const formatDateForGoogleCalendar = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}00Z`; // UTC time format
  };

  // Function to open Google Calendar with event details
  const addToCalendar = (event) => {
    const rating = ratings[event.id] || "No Rating"; // Get the event's rating
    const eventDetails = {
      title: `${event.name} - Rated: ${rating}/5`,
      startDate: formatDateForGoogleCalendar(event.date),
      location: event.location,
    };

    const calendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${encodeURIComponent(eventDetails.startDate)}/${encodeURIComponent(
      eventDetails.startDate
    )}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(
      "Check out this event!"
    )}`;

    window.open(calendarURL, "_blank");
  };

  // Function to handle rating input
  const handleRatingChange = (eventId, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [eventId]: value,
    }));
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      {events.length === 0 ? (
        <p className="text-gray-500">No recommendations available.</p>
      ) : (
        <div className="swiper-container">
          <Swiper spaceBetween={30} slidesPerView={1} navigation={true} loop={true} >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="event-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-700">Date: {event.date}</p>
                  <p className="text-gray-500">Location: {event.location}</p>

                  {/* Rating Input */}
                  <label className="block mt-2 text-gray-600">Rate this event:</label>
                  <select
                    value={ratings[event.id] || ""}
                    onChange={(e) => handleRatingChange(event.id, e.target.value)}
                    className="border rounded px-2 py-1 mt-1"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>

                  {/* Add to Calendar Button */}
                  <button
                    onClick={() => addToCalendar(event)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add to Calendar
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
