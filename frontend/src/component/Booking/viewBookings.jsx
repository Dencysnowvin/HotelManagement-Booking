import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UpdateBookings from "./updateBooking";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
          const roles = decodedToken.roles;
          console.log("Roles:", roles);
          setIsAdmin(roles.includes("admin"));
        } else {
          console.warn("userToken not found in localStorage.");
        }

        const response = await axios.get("http://localhost:8097/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched Bookings:", response.data);
        if (response.data) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:8097/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Booking Deleted Successfully!");
      setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking. Check console.");
    }
  };

  const handleUpdate = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  const closeUpdateForm = () => {
    setSelectedBookingId(null);
  };

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/layout">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white btn btn-primary ms-2" to="/createbooking">
                  Add Booking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h2 className="text-center mb-4">Available Bookings</h2>
      {bookings && bookings.length === 0 ? (
        <p className="text-center">No bookings available.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Booking ID: {booking.bookingId}</h5>
                  <p className="card-text">Room ID: {booking.roomId}</p>
                  <p className="card-text">Guest ID: {booking.guestId}</p>
                  <p className="card-text">Check-in Date: {booking.checkInDate}</p>
                  <p className="card-text">Check-out Date: {booking.checkOutDate}</p>
                  <p className="card-text">Price: ${booking.price}</p>
                  <div className="d-flex justify-content-between">
                    {isAdmin && (
                      <>
                        <button
                          className="btn btn-success me-1"
                          onClick={() => handleUpdate(booking.bookingId)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger me-1"
                          onClick={() => handleDelete(booking.bookingId)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedBookingId && (
        
        <UpdateBookings
          bookingId={selectedBookingId}
          onClose={closeUpdateForm}
          bookings={bookings}
          setBookings={setBookings}
        />
      )}
    </div>
  );
};

export default ViewBookings;