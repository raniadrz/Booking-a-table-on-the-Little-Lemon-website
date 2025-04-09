import React, { useState, useEffect } from "react";
import "./BookingForm.css";

const BookingForm = ({ availableTimes, dispatch, submitForm, initialDate }) => {
  const [formData, setFormData] = useState({
    date: initialDate || "",
    time: "",
    guests: "",
    occasion: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialDate) {
      setFormData(prev => ({
        ...prev,
        date: initialDate
      }));
      dispatch(initialDate);
    }
  }, [initialDate, dispatch]);

  const validateForm = () => {
    const newErrors = {};
    
    // Date validation
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    // Guests validation
    if (!formData.guests) {
      newErrors.guests = "Number of guests is required";
    } else if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10";
    }

    // Occasion validation
    if (!formData.occasion) {
      newErrors.occasion = "Occasion is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "date") {
      dispatch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitForm(formData);
    }
  };

  return (
    <section className="booking-form" aria-label="Reservation Form">
      <div className="form-section">
        <h1>Reserve a Table</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="res-date">Choose date*</label>
            <input
              type="date"
              id="res-date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.date}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="res-time">Choose time*</label>
            <select
              id="res-time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.time}
            >
              <option value="">Select a Time</option>
              {availableTimes.availableTimes.map(time => (
                <option key={time}>{time}</option>
              ))}
            </select>
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of guests*</label>
            <input
              type="number"
              placeholder="1"
              min="1"
              max="10"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.guests}
            />
            {errors.guests && <span className="error-message">{errors.guests}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion*</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.occasion}
            >
              <option value="">Select an Option</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business</option>
            </select>
            {errors.occasion && <span className="error-message">{errors.occasion}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            aria-label="On Click"
          >
            Make Your Reservation
          </button>
        </form>
      </div>
      <div className="booking-image">
        <img 
          src="https://sharpmagazine.com/wp-content/uploads/2023/02/le-plongeoir-1.jpg" 
          alt="Restaurant interior" 
        />
      </div>
    </section>
  );
};

export default BookingForm;
