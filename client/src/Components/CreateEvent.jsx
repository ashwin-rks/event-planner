import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./UIComponents/Navbar";
import TextInput from "./UIComponents/FormComponents/TextInput";
import DateInput from "./UIComponents/FormComponents/DateInput";
import axios from "axios";

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventType: "",
    imageUrl: "",
    eventStart: "",
    eventEnd: "",
    eventDescription: "",
    ticketPrice: 0,
    ticketsAvailable: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!eventDetails.eventName.trim()) {
      newErrors = {
        ...newErrors,
        eventName: true,
      };
    }

    if (!eventDetails.eventDescription.trim()) {
      newErrors = {
        ...newErrors,
        eventDescription: true,
      };
    }

    if (!eventDetails.eventType.trim()) {
      newErrors = {
        ...newErrors,
        eventType: true,
      };
    }

    if (eventDetails.ticketPrice <= 0) {
      newErrors = {
        ...newErrors,
        ticketPrice: true,
      };
    }

    if (eventDetails.ticketsAvailable <= 0) {
      newErrors = {
        ...newErrors,
        ticketsAvailable: true,
      };
    }
    

    const start = new Date(eventDetails.eventStart);
    const end = new Date(eventDetails.eventEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      newErrors = {
        ...newErrors,
        date: true,
      };
    } else if (start >= end) {
      newErrors = {
        ...newErrors,
        date: true,
      };
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    validateForm();

    if (Object.keys(errors).length > 0) {
      console.log("Form validation failed:", errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/create-event/",
        eventDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Event created successfully:", response.data);

      setEventDetails({
        eventName: "",
        eventType: "",
        imageUrl: "",
        eventStart: "",
        eventEnd: "",
        eventDescription: "",
        ticketPrice: 0,
        ticketsAvailable: 0,
      });
      setErrors({});
      toast.success("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event. Please try again.");
    }
  };


  return (
    <>
      <div id="create-event">
        <div className="p-0">
          <Navbar />
        </div>

        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="col-12 p-0">
              <div className="border rounded setColor borderColor p-0 m-0">
                <div className="text-center my-4">
                  <p className="h1 font-weight-bold">Create Event</p>
                </div>
                <TextInput
                  id={"eventName"}
                  label={"Event Name"}
                  handleChange={handleChange}
                  errors={errors}
                />
                <div className="mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                  <label htmlFor="eventType" className="form-label fs-5 ">
                    Event Type
                  </label>
                  <select
                    className={`form-control form-control-lg ${
                      errors.eventType ? "setError" : ""
                    }`}
                    id="eventType"
                    name="eventType"
                    onChange={handleChange}
                  >
                    <option value="">Select Event Type</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="THEATRE">THEATRE</option>
                  </select>
                </div>
                <div className="mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                  <label htmlFor="eventDescription" className="form-label fs-5">
                    Event Description
                  </label>
                  <textarea
                    className={`form-control form-control-lg ${
                      errors.eventDescription ? "setError" : ""
                    }`}
                    id="eventDescription"
                    name="eventDescription"
                    onChange={handleChange}
                    maxLength="250"
                    rows="3"
                  ></textarea>
                </div>
                <TextInput
                  id={"imageUrl"}
                  label={"Image Url"}
                  handleChange={handleChange}
                  errors={errors}
                />
                <div className="mb-3 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                  <label htmlFor="ticketPrice" className="form-label fs-5">
                    Ticket Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text setColor borderColor">
                      ₹
                    </span>
                    <input
                      type="number"
                      className={`form-control form-control-lg  ${
                        errors.ticketPrice ? "setError" : ""
                      }`}
                      id="ticketPrice"
                      name="ticketPrice"
                      onChange={handleChange}
                      min="0"
                      step="10"
                    />
                  </div>
                </div>
                <div className="mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                  <label htmlFor="ticketsAvailable" className="form-label fs-5">
                    Available Tickets
                  </label>
                  <input
                    type="number"
                    className={`form-control form-control-lg ${
                      errors.ticketsAvailable ? "setError" : ""
                    }`}
                    id="ticketsAvailable"
                    name="ticketsAvailable"
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <DateInput handleChange={handleChange} errors={errors} />
                <div className="my-4 mx-0 mx-md-2 mx-lg-4 d-flex justify-content-end">
                  <button
                    className="btn btnColor fs-3"
                    style={{ width: "12rem" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
