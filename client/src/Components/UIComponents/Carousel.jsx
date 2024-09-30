import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { toast } from "react-toastify";

const Carousel = ({ cardData }) => {
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
        toast.success('Ticket Booked');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in booking ticket');
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: cardData.length >= 3 ? 3 : cardData.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {cardData.length > 1 ? (
        <Slider {...settings}>
          {cardData.map((event) => (
            <div
              key={event.id}
              className="card"
              style={{
                color: "#1e1938",
                backgroundColor: "#dd99bb",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <div className="card-img-container">
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              </div>
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
                <p className="card-text" style={{ height: "100px" }}>
                  <strong>Description:</strong> {event.eventDescription}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ₹{event.ticketPrice}
                </p>
                <p className="card-text">
                  <strong>Available Tickets:</strong> {event.ticketsAvailable}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-primary" onClick={() => handleBooking(event.id)}>
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{color:"#fff"}}>No events available</h3>
        </div>
      )}
    </div>
  );
};

export default Carousel;
