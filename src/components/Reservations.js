import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservations.css';

const MAX_CAPACITY = 100;
const TIME_SLOT_GAP = 2; // hours

const Reservations = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [capacity, setCapacity] = useState(0);

  // Dummy reservations data with different types
  const dummyReservations = [
    { id: 1, name: 'John Doe', date: '2024-03-20', time: '18:00', guests: 100, occasion: 'Birthday', type: 'birthday' },
    { id: 2, name: 'Jane Smith', date: '2024-03-20', time: '19:30', guests: 2, occasion: 'Anniversary', type: 'anniversary' },
    { id: 3, name: 'Mike Johnson', date: '2024-03-21', time: '20:00', guests: 6, occasion: 'Business', type: 'business' },
    { id: 4, name: 'Sarah Williams', date: '2024-03-22', time: '17:30', guests: 3, occasion: 'Birthday', type: 'birthday' },
    { id: 5, name: 'David Brown', date: '2024-03-23', time: '19:00', guests: 5, occasion: 'Anniversary', type: 'anniversary' },
    { id: 6, name: 'Emily Davis', date: '2024-03-24', time: '18:30', guests: 2, occasion: 'Business', type: 'business' },
    { id: 7, name: 'John Doe', date: '2024-03-25', time: '18:00', guests: 4, occasion: 'Birthday', type: 'birthday' },
    { id: 8, name: 'Jane Smith', date: '2024-03-25', time: '19:30', guests: 2, occasion: 'Anniversary', type: 'anniversary' },
    { id: 9, name: 'Mike Johnson', date: '2024-03-26', time: '20:00', guests: 6, occasion: 'Business', type: 'business' },
    { id: 10, name: 'Sarah Williams', date: '2024-03-27', time: '17:30', guests: 3, occasion: 'Birthday', type: 'birthday' }, 
    { id: 11, name: 'John Doe', date: '2024-03-28', time: '18:00', guests: 4, occasion: 'Birthday', type: 'birthday' },
    { id: 12, name: 'Jane Smith', date: '2024-03-28', time: '19:30', guests: 2, occasion: 'Anniversary', type: 'anniversary' },
    { id: 13, name: 'Mike Johnson', date: '2024-03-29', time: '20:00', guests: 6, occasion: 'Business', type: 'business' },
    { id: 14, name: 'Sarah Williams', date: '2024-03-30', time: '17:30', guests: 3, occasion: 'Birthday', type: 'birthday' }, 
    { id: 15, name: 'John Doe', date: '2024-03-31', time: '18:00', guests: 4, occasion: 'Birthday', type: 'birthday' },
    { id: 16, name: 'Jane Smith', date: '2024-03-31', time: '19:30', guests: 2, occasion: 'Anniversary', type: 'anniversary' },
    { id: 17, name: 'Mike Johnson', date: '2024-04-01', time: '20:00', guests: 6, occasion: 'Business', type: 'business' },
    { id: 18, name: 'Sarah Williams', date: '2024-04-02', time: '17:30', guests: 3, occasion: 'Birthday', type: 'birthday' },
    { id: 19, name: 'John Doe', date: '2024-04-03', time: '18:00', guests: 4, occasion: 'Birthday', type: 'birthday' },
    { id: 20, name: 'Jane Smith', date: '2024-04-03', time: '19:30', guests: 2, occasion: 'Anniversary', type: 'anniversary' },
    { id: 21, name: 'Mike Johnson', date: '2024-04-04', time: '20:00', guests: 6, occasion: 'Business', type: 'business' },
    { id: 22, name: 'Sarah Williams', date: '2024-04-05', time: '17:30', guests: 3, occasion: 'Birthday', type: 'birthday' },
    { id: 23, name: 'John Doe', date: '2024-04-06', time: '18:00', guests: 4, occasion: 'Birthday', type: 'birthday' },
    
  ];

  // Generate time slots for a day
  const generateTimeSlots = (date) => {
    const slots = [];
    const startHour = 11; // 11 AM
    const endHour = 22;   // 10 PM
    
    // Get all reservations for the selected date
    const dateReservations = dummyReservations.filter(
      res => res.date === date
    );
    
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      
      // Get reservations for this specific time slot
      const timeSlotReservations = dateReservations.filter(
        res => res.time === time
      );
      
      const totalGuests = timeSlotReservations.reduce((sum, res) => sum + res.guests, 0);
      
      // Check if there are any reservations within 2 hours before or after
      const hasNearbyReservation = dateReservations.some(res => {
        const [resHour] = res.time.split(':').map(Number);
        return Math.abs(resHour - hour) < TIME_SLOT_GAP;
      });
      
      // Check if the time slot is at full capacity
      const isFull = totalGuests >= MAX_CAPACITY;
      
      // A slot is available only if:
      // 1. It's not at full capacity
      // 2. There are no nearby reservations
      const isAvailable = !isFull && !hasNearbyReservation;
      
      slots.push({
        time,
        isAvailable,
        isFull,
        currentGuests: totalGuests,
        reservations: timeSlotReservations,
        hasNearbyReservation
      });
    }
    
    return slots;
  };

  // Generate calendar days for the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const dateString = date.toISOString().split('T')[0];
    const reservations = dummyReservations.filter(res => res.date === dateString);
    const hasReservation = reservations.length > 0;
    const reservationType = hasReservation ? reservations[0].type : null;
    const totalGuests = reservations.reduce((sum, res) => sum + res.guests, 0);
    
    calendarDays.push({
      day: i,
      date: dateString,
      hasReservation,
      reservationType,
      reservationCount: reservations.length,
      totalGuests
    });
  }

  const handleDateClick = (date) => {
    if (!date.hasReservation || date.totalGuests < MAX_CAPACITY) {
      setSelectedDate(date.date);
      const slots = generateTimeSlots(date.date);
      setTimeSlots(slots);
      setCapacity(date.totalGuests);
    }
  };

  const getDayClassName = (day) => {
    if (!day) return 'calendar-day empty';
    if (day.hasReservation) {
      if (day.totalGuests >= MAX_CAPACITY) {
        return 'calendar-day booked full';
      }
      return `calendar-day booked ${day.reservationType}`;
    }
    return 'calendar-day available';
  };

  return (
    <div className="reservations-container">
      <h1>Reservations</h1>
      
      <div className="reservations-content">
        <div className="calendar-section">
          <h2>March 2024</h2>
          <div className="calendar">
            <div className="calendar-header">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="calendar-grid">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={getDayClassName(day)}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day ? day.day : ''}
                  {day?.reservationCount > 1 && (
                    <span className="reservation-count">{day.reservationCount}</span>
                  )}
                  {day?.totalGuests > 0 && (
                    <span className="guest-count">{day.totalGuests}/{MAX_CAPACITY}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color birthday"></div>
              <span>Birthday</span>
            </div>
            <div className="legend-item">
              <div className="legend-color anniversary"></div>
              <span>Anniversary</span>
            </div>
            <div className="legend-item">
              <div className="legend-color business"></div>
              <span>Business</span>
            </div>
            <div className="legend-item">
              <div className="legend-color full"></div>
              <span>Full</span>
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="time-slots-section">
            <h2>Available Time Slots for {new Date(selectedDate).toLocaleDateString()}</h2>
            <div className="time-slots-grid">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`time-slot ${slot.isFull ? 'full' : slot.isAvailable ? 'available' : 'booked'}`}
                  onClick={() => {
                    if (slot.isAvailable) {
                      navigate(`/booking?date=${selectedDate}&time=${slot.time}`);
                    }
                  }}
                >
                  <span className="time">{slot.time}</span>
                  <span className="guests">{slot.currentGuests}/{MAX_CAPACITY} guests</span>
                  {slot.isFull && (
                    <span className="full-warning">Full Capacity</span>
                  )}
                  {slot.hasNearbyReservation && !slot.isAvailable && !slot.isFull && (
                    <span className="nearby-warning">Nearby reservation</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="reservations-list">
          <h2>Upcoming Reservations</h2>
          <div className="reservations-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Guests</th>
                  <th>Occasion</th>
                </tr>
              </thead>
              <tbody>
                {dummyReservations.map(reservation => (
                  <tr key={reservation.id} className={reservation.type}>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.name}</td>
                    <td>{reservation.guests}</td>
                    <td>{reservation.occasion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations; 