import React from "react";
import BookingForm from "./BookingForm";
import { useLocation } from "react-router-dom";

const Booking = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date');

  return (
    <BookingForm 
      availableTimes={props.availableTimes} 
      dispatch={props.dispatch} 
      submitForm={props.submitForm}
      initialDate={date}
    />
  );
};

export default Booking;