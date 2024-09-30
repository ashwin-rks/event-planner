import React, { useState, useEffect } from 'react';
import Navbar from './UIComponents/Navbar';
import Carousel from './UIComponents/Carousel';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [theatreEvents, setTheatreEvents] = useState([]);
  const [musicEvents, setMusicEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([]);

  useEffect(() => {
    async function getCardData() {
      try {
        const response = await axios.get('http://localhost:8000/user/get-unbooked-events', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.status === 200) {
          const events = response.data;
          setTheatreEvents(events.filter(event => event.eventType === 'THEATRE'));
          setMusicEvents(events.filter(event => event.eventType === 'MUSIC'));
          setSportsEvents(events.filter(event => event.eventType === 'SPORTS'));
          
          
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error('Failed to fetch events');
      }
    }

    getCardData();
  }, []);

  return (
    <div id="dashboard">
      <div className=''>
        <Navbar />
      </div>
      <div className="carousel-section">
        <div className="carousel-header d-flex justify-content-between ">
          <h2 style={{ color: "#dd99bb" }}>Theatre Events</h2>
          <Link to="/theatre-events" style={{ color: "#dd99bb", textDecoration: 'underline' }}>More</Link>
        </div>
        <Carousel cardData={theatreEvents} />
      </div>
      <div className="carousel-section">
        <div className="carousel-header d-flex justify-content-between">
          <h2 style={{ color: "#dd99bb" }}>Music Events</h2>
          <Link to="/music-events" style={{ color: "#dd99bb", textDecoration: 'underline' }}>More</Link>
        </div>
        <Carousel cardData={musicEvents} />
      </div>
      <div className="carousel-section">
        <div className="carousel-header d-flex justify-content-between">
          <h2 style={{ color: "#dd99bb" }}>Sports Events</h2>
          <Link to="/sports-events" style={{ color: "#dd99bb", textDecoration: 'underline' }}>More</Link>
        </div>
        <Carousel cardData={sportsEvents} />
      </div>
    </div>
  );
}

export default Dashboard;
