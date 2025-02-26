import React, { useEffect, useState } from "react";
import CreateEvent from "../components/create-event";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null); // Track the event being deleted

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");

    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: async () => {
            setDeletingEventId(eventId); // Set loading state for this event

            try {
              const response = await fetch(`/api/events/${eventId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              });

              if (response.ok) {
                setUser((prevUser) => ({
                  ...prevUser,
                  createdEvents: prevUser.createdEvents.filter((e) => e._id !== eventId),
                }));

                toast.success("Event deleted successfully!");
              } else {
                toast.error("Failed to delete event. Please try again.");
              }
            } catch (error) {
              console.error("Error deleting event:", error);
              toast.error("An error occurred. Please try again.");
            } finally {
              setDeletingEventId(null); // Reset loading state
            }
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {user && (
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>

          {(user.role === "event_creator" || user.role === "admin") && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Create an Event</h2>
              <CreateEvent />
            </div>
          )}

          {(user.role === "event_creator" || user.role === "admin") &&
            user.createdEvents?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Your Created Events</h2>
                <ul className="mt-4 space-y-4">
                  {user.createdEvents.map((event) => (
                    <li key={event._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold">{event.name}</h3>
                      <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
                      <p className="text-gray-500">{event.location}</p>
                      <p className="text-gray-700">{event.description}</p>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingEventId === event._id} // Disable button when loading
                        className={`p-2 rounded mt-2 ${
                          deletingEventId === event._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {deletingEventId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Profile;
