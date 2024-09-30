import React, { useEffect, useState } from "react";
import Navbar from "./UIComponents/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getEventTypeFromUrl = () => {
      const path = location.pathname;
      if (path.includes("/theatre-events")) return 2;
      if (path.includes("/music-events")) return 1;
      if (path.includes("/sports-events")) return 3;
      return null;
    };

    const fetchFilteredEvents = async (eventType) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/get-filtered-events/${eventType}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch filtered events.", error);
      }
    };

    const eventType = getEventTypeFromUrl();
    if (eventType) {
      fetchFilteredEvents(eventType);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleSearch = () => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const newFilteredEvents = events.filter(
        (event) =>
          event.eventName.toLowerCase().includes(lowercasedSearchTerm) ||
          event.eventDescription.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredEvents(newFilteredEvents);
    };

    handleSearch();
  }, [searchTerm, events]);

  const handleBooking = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/book-event/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Ticket Booked");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in booking ticket");
    }
  };

  return (
    <>
      <div id="my-bookings">
        <div className="p-0">
          <Navbar />
        </div>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="setColor" style={{ color: "#dd99bb" }}>
              All Events
            </h1>
            <div className="mb-4 position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: "2.5rem" }}
              />
              <FaSearch
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                }}
              />
            </div>
          </div>
          <div className="row">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={event.id}>
                  <div
                    className="card"
                    style={{ color: "#1e1938", backgroundColor: "#dd99bb" }}
                  >
                    <img
                      src={event.imageUrl}
                      className="card-img-top"
                      alt={event.eventName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{event.eventName}</h5>
                      <p className="card-text">
                        <strong>Type:</strong> {event.eventType}
                      </p>
                      <p className="card-text">
                        <strong>Start:</strong>{" "}
                        {new Date(event.eventStart).toLocaleString()}
                      </p>
                      <p className="card-text">
                        <strong>End:</strong>{" "}
                        {new Date(event.eventEnd).toLocaleString()}
                      </p>
                      <p className="card-text" style={{ height: "150px" }}>
                        <strong>Description:</strong> {event.eventDescription}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{event.ticketPrice}
                      </p>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBooking(event.id)}
                        >
                          Book Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No events found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEvents;
