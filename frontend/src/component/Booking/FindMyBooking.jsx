import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UpdateBookings from "./updateBooking";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom"; 
import "../../CSS/FindMyBooking.css"
import DeleteBooking from "./deleteBooking";

const FindMyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleteBookingId, setDeleteBookingId] = useState(null); // Add deleteBookingId state
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("userToken");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const roles = decodedToken.roles;
                    setIsAdmin(roles.includes("admin"));
                } else {
                    console.warn("userToken not found in localStorage.");
                }

                const guestId = jwtDecode(token).userId; // Get guestId from token
                const response = await axios.get(`http://localhost:8097/api/bookings/guest/${guestId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setBookings(response.data);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleUpdate = (bookingId) => {
        setSelectedBookingId(bookingId);
    };

    const closeUpdateForm = () => {
        setSelectedBookingId(null);
    };

    const handleDelete = (bookingId) => {
        setDeleteBookingId(bookingId);
    };

    const closeDeleteForm = () => {
        setDeleteBookingId(null);
    };

    const handlePay = (bookingId) => {
        navigate(`/createpayment?bookingId=${bookingId}`); // Navigate to payment page
    };


    return (
        <Nav>
            <div className="container booking-container">
                <h2 className="text-center mb-4">My Bookings</h2>

                {loading ? (
                    <div className="loading-spinner"></div>
                ) : bookings && bookings.length === 0 ? (
                    <p className="empty-message">No bookings available.</p>
                ) : (
                    <div className="row">
                        {bookings.map((booking) => (
                            <div key={booking.bookingId} className="col-md-4 mb-4">
                                <div className="card shadow-sm h-100 booking-card">
                                    <div className="card-body booking-card-body">
                                        <h5 className="card-title fw-bold booking-card-title">Booking ID: {booking.bookingId}</h5>
                                        <p className="card-text booking-card-text">Room ID: {booking.roomId}</p>
                                        <p className="card-text booking-card-text">Guest ID: {booking.guestId}</p>
                                        <p className="card-text booking-card-text">Check-in Date: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                        <p className="card-text booking-card-text">Check-out Date: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                        <p className="card-text booking-card-text">Price: ${booking.price}</p>
                                        <div className="d-flex flex-column mt-3">
                                        <div className="d-flex justify-content-between mb-2">
                                                <button className="btn btn-info" onClick={() => handleDelete(booking.bookingId)}>
                                                    Delete
                                                </button><br></br><br></br>
                                                <button className="btn btn-info" onClick={() => handlePay(booking.bookingId)}>
                                                   Procced to Pay
                                                </button>
                                            </div>
                                            {isAdmin && (
                                                <div className="d-flex justify-content-between mb-2">
                                                    <button className="btn btn-success" onClick={() => handleUpdate(booking.bookingId)}>
                                                        Update
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedBookingId && (
                    <UpdateBookings bookingId={selectedBookingId} onClose={closeUpdateForm} bookings={bookings} setBookings={setBookings} />
                )}
                {deleteBookingId && (
                    <DeleteBooking bookingId={deleteBookingId} onClose={closeDeleteForm} bookings={bookings} setBookings={setBookings} />
                )}
            </div>
        </Nav>
    );
};

export default FindMyBooking;