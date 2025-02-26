import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserProfile from '../components/user-profile';
import Recommendations from '../components/recommendations';

const Home = () => {
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/events')
  //     .then((response) => setEvents(response.data))
  //     .catch((error) => console.error('Error fetching events:', error));
  // }, []);

  return (
    <div className="p-4">
      <UserProfile />
      {/* <h1 className="text-2xl font-bold mb-4">Featured Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-gray-600">{event.description}</p>
            <Link to={`/event/${event._id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div> */}
      <div className="recommendations-section bg-brown p-2 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Event Recommendations</h2>
        <Recommendations />
      </div>
    </div>
  );
};

export default Home;