import React, { useEffect, useState } from "react";
import Navbar from "./UIComponents/Navbar";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // Function to filter out events that have ended and have been over 1 hour since they ended
  const filterExpiredEvents = (events) => {
    const now = new Date();
    return events.filter((event) => {
      const end = new Date(event.eventEnd);
      const oneHour = 1000 * 60 * 60; // 1 hour in milliseconds
      return !(now > end && (now - end) > oneHour);
    });
  };

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/get-user-bookings`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Filter out expired events
        const filteredBookings = filterExpiredEvents(response.data);
        setBookings(filteredBookings);
      } catch (error) {
        console.log("Failed to fetch bookings.");
        console.error(error);
      }
    };

    getBookings();
  }, []);

  return (
    <>
      <div id="my-bookings">
        <div className="p-0">
          <Navbar />
        </div>
        <div className="container mt-4">
          <h1 className="mb-4 setColor" style={{ color: "#dd99bb" }}>
            My Bookings
          </h1>
          <div className="row">
            {bookings.length > 0 ? (
              bookings.map((event) => (
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
                      <p className="card-text">
                        <strong>Description:</strong> {event.eventDescription}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{event.ticketPrice}
                      </p>
                      <p className="card-text">
                        <strong>By:</strong> {event.creator.firstName}{" "}
                        {event.creator.lastName}
                      </p>
                      <p className="card-text">
                        {(() => {
                          const now = new Date();
                          const start = new Date(event.eventStart);
                          const end = new Date(event.eventEnd);

                          let status;
                          if (now < start) {
                            status = "Yet to Start";
                          } else if (now >= start && now <= end) {
                            status = "Ongoing";
                          } else {
                            status = "Ended";
                          }

                          const statusStyle = {
                            display: "inline-block",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                          };

                          if (status === "Yet to Start") {
                            return (
                              <div
                                style={{
                                  ...statusStyle,
                                  backgroundColor: "#28a745",
                                }}
                              >
                                {status}
                              </div>
                            );
                          } else if (status === "Ongoing") {
                            return (
                              <div
                                style={{
                                  ...statusStyle,
                                  backgroundColor: "#ffc107",
                                }}
                              >
                                {status}
                              </div>
                            );
                          } else {
                            return (
                              <div
                                style={{
                                  ...statusStyle,
                                  backgroundColor: "#dc3545",
                                }}
                              >
                                {status}
                              </div>
                            );
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No bookings found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
