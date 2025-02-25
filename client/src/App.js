import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import EventDetails from './pages/event-details';
// import UserProfile from './components/user-profile';
import EventCalendar from './pages/event-calendar';
import Register from './pages/register';
import Login from './pages/login';
// import { syncIndexes } from '../../server/models/User';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/calendar" element={<EventCalendar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;