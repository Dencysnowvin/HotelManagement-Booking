import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBookings = ({ bookingId, onClose, bookings, setBookings }) => {
  const [booking, setBooking] = useState({
    roomId: "",
    guestId: "",
    checkInDate: "",
    checkOutDate: "",
    price: 0,
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`http://localhost:8097/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        alert("Error fetching booking. Check console.");
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(`http://localhost:8097/api/bookings/${bookingId}`, booking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Booking updated successfully!");
      onClose();
      const updatedBookings = bookings.map((currentBooking) =>
        currentBooking.bookingId === bookingId ? booking : currentBooking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      alert("Error updating booking. Check console.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room ID:</label>
          <input
            type="number"
            name="roomId"
            value={booking.roomId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Guest ID:</label>
          <input
            type="number"
            name="guestId"
            value={booking.guestId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-in Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={booking.checkInDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={booking.checkOutDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={booking.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Booking
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateBookings;