import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="mt-2"><strong>Location:</strong> {event.location}</p>
    </div>
  );
};

export default EventDetails;