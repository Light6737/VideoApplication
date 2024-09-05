import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Login from './Login';
import Dashboard from './Dashboard';
import History from './History';
import VideoPlayer from './VideoPlayer';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Navbar if not on the login page */}
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />           {/* Use 'element' prop */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/videoplayer" element={<VideoPlayer />} />

      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;