import React, { useEffect, useState } from "react";
import Navbar from "./UIComponents/Navbar";
import EditEvent from "./EditEvent";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    imageUrl: "",
    ticketPrice: ""
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/admin/get-manager-events`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.log('Failed to fetch events.');
        console.error(err);
      }
    };

    fetchEvents();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`http://localhost:8000/admin/delete-event/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.status === 200) {
          console.log('Event deleted successfully');
          setRefresh(prev => !prev);
        } else {
          console.error('Failed to delete event:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  }

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData({
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      imageUrl: event.imageUrl,
      ticketPrice: event.ticketPrice
    });
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setEditEvent(null);
  }

  return (
    <>
      <div id="my-event">
        <div className="p-0">
          <Navbar />
        </div>
        <div className="container mt-4">
          <h1 className="mb-4 setColor" style={{ color: "#dd99bb" }}>My Events</h1>
          <div className="row">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={event.id}>
                  <div className="card" style={{ color: "#1e1938", backgroundColor: "#dd99bb" }}>
                    <img
                      src={event.imageUrl}
                      className="card-img-top"
                      alt={event.eventName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{event.eventName}</h5>
                      <p className="card-text"><strong>Type:</strong> {event.eventType}</p>
                      <p className="card-text"><strong>Start:</strong> {new Date(event.eventStart).toLocaleString()}</p>
                      <p className="card-text"><strong>End:</strong> {new Date(event.eventEnd).toLocaleString()}</p>
                      <p className="card-text"><strong>Description:</strong> {event.eventDescription}</p>
                      <p className="card-text"><strong>Price:</strong> ₹{event.ticketPrice}</p>
                      <p className="card-text"><strong>Available Tickets:</strong> {event.ticketsAvailable}</p>
                      <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-primary" onClick={() => handleEdit(event)}>
                          <FaEdit /> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>
                          <FaTrash /> Delete
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
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Body className="p-0 border borderColor rounded">
            <EditEvent
              event={editEvent}
              formData={formData}
              setFormData={setFormData}
              handleClose={handleClose}
              setRefresh={setRefresh}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default MyEvents;
