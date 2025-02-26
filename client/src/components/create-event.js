import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({ ...data, date }), // Send form data
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Event created successfully!");
        reset();
        setDate(new Date());
      } else {
        setMessage(result.message || "Failed to create event");
      }
    } catch (error) {
      setMessage("Error creating event.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      {message && <p className="text-center text-green-500">{message}</p>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Event Name"
          className="w-full p-2 border rounded"
        />
        
        <input
          {...register("location", { required: true })}
          placeholder="Event Location"
          className="w-full p-2 border rounded"
        />
        
        <textarea
          {...register("description")}
          placeholder="Event Description"
          className="w-full p-2 border rounded"
        ></textarea>
        
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="w-full p-2 border rounded"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
