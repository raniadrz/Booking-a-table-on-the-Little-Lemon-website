import React from "react";
import { useState } from "react";
import "./BookingForm.css";

const BookingForm = (props) => {
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitForm(e);
  };

  const handleChange = (e) => {
    setDate(e);
    props.dispatch(e);
  };

  return (
    <div className="booking-container">
      <div className="form-section">
        <h1>BOOKING</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="book-date">Date*</label>
              <input
                id="book-date"
                value={date}
                onChange={(e) => handleChange(e.target.value)}
                type="date"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="book-time">Time*</label>
              <select
                id="book-time"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                required
              >
                <option value="">18:00</option>
                {props.availableTimes.availableTimes.map((availableTime) => (
                  <option key={availableTime}>{availableTime}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="book-guests">People*</label>
            <select
              id="book-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            >
              <option value="">4 persons</option>
              <option value="1">1 person</option>
              <option value="2">2 persons</option>
              <option value="3">3 persons</option>
              <option value="4">4 persons</option>
              <option value="5">5 persons</option>
              <option value="6">6 persons</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="book-occasion">Occasion*</label>
            <select
              id="book-occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
            >
              <option value="">Select an Option</option>
              <option>Birthday</option>
              <option>Anniversary</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Book a table
          </button>
        </form>
      </div>
      <div className="booking-image">
        <img src="https://sharpmagazine.com/wp-content/uploads/2023/02/le-plongeoir-1.jpg" alt="Delicious" />
      </div>
    </div>
  );
};

export default BookingForm;
