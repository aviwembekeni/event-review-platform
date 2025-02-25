import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Default Swiper styles
import 'swiper/css/pagination'; // Pagination styles
import 'swiper/css/navigation'; // Navigation button styles

import formatDateForGoogleCalendar from "../functions/formatDateForGoogleCalendar";
// import { Navigation } from 'swiper'; // Import the Navigation module

const Recommendations = () => {
  const [events, setEvents] = useState([]);
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

  // Function to create an event URL for Google Calendar
  const addToCalendar = (event) => {
    const eventDetails = {
      title: event.name,
      startDate: formatDateForGoogleCalendar(event.date),
      location: event.location,
    };

    const calendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${encodeURIComponent(eventDetails.startDate)}/${encodeURIComponent(eventDetails.startDate)}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent('Check out this event!')}`;

    // Open the Google Calendar in a new tab to add the event
    window.open(calendarURL, "_blank");
  };

  return (
    <div className="recommendations-container absolute top-4 right-4 z-10">
      {events.length === 0 ? (
        <p className="text-gray-500">No recommendations available at the moment.</p>
      ) : (
        <div className="swiper-container">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            // modules={[Navigation]}
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <div className="event-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{event.name}</h3>
                      <p className="text-gray-700">Date: {event.date}</p>
                      <p className="text-gray-500">Location: {event.location}</p>
                    </div>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 ml-4"
                    >
                      View Event
                    </a>
                  </div>
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
