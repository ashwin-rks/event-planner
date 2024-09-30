import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TextInput from "./UIComponents/FormComponents/TextInput";
import axios from "axios";

const EditEvent = ({ event, formData, setFormData, handleClose, setRefresh }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        imageUrl: event.imageUrl,
        ticketPrice: event.ticketPrice
      });
    }
  }, [event, setFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.eventName.trim()) {
      newErrors = { ...newErrors, eventName: true };
    }

    if (!formData.eventDescription.trim()) {
      newErrors = { ...newErrors, eventDescription: true };
    }

    if (formData.ticketPrice <= 0) {
      newErrors = { ...newErrors, ticketPrice: true };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/admin/edit-event/${event.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Event updated successfully:", response.data);

      setFormData({
        eventName: "",
        imageUrl: "",
        eventDescription: "",
        ticketPrice: 0,
      });
      setErrors({});
      toast.success("Event updated successfully!");
      setRefresh(prev => !prev);
      handleClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 p-0">
            <div className="border rounded setColor p-0 m-0">
              <div className="text-center my-4">
                <p className="h1 font-weight-bold">Edit Event</p>
              </div>
              <TextInput
                id={"eventName"}
                label={"Event Name"}
                handleChange={handleChange}
                errors={errors}
                value={formData.eventName}
              />
              <div className="mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                <label htmlFor="eventDescription" className="form-label fs-5">
                  Event Description
                </label>
                <textarea
                  className={`form-control form-control-lg ${errors.eventDescription ? "setError" : ""}`}
                  id="eventDescription"
                  name="eventDescription"
                  onChange={handleChange}
                  maxLength="250"
                  rows="3"
                  value={formData.eventDescription}
                ></textarea>
              </div>
              <TextInput
                id={"imageUrl"}
                label={"Image Url"}
                handleChange={handleChange}
                errors={errors}
                value={formData.imageUrl}
              />
              <div className="mb-3 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
                <label htmlFor="ticketPrice" className="form-label fs-5">
                  Ticket Price
                </label>
                <div className="input-group">
                  <span className="input-group-text setColor borderColor">₹</span>
                  <input
                    type="number"
                    className={`form-control form-control-lg ${errors.ticketPrice ? "setError" : ""}`}
                    id="ticketPrice"
                    name="ticketPrice"
                    onChange={handleChange}
                    min="0"
                    step="10"
                    value={formData.ticketPrice}
                  />
                </div>
              </div>
              <div className="my-4 mx-0 mx-md-2 mx-lg-4 d-flex justify-content-end">
                <button
                  className="btn btnColor fs-3"
                  style={{ width: "12rem" }}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
