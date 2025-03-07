import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import "../../CSS/FindMyBooking.css";
import DeleteBooking from "./deleteBooking";

const FindAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleteBookingId, setDeleteBookingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("FindAllBookings useEffect running"); // Log useEffect execution
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("userToken");
                console.log("Token:", token); // Log token

                if (token) {
                    const decodedToken = jwtDecode(token);
                    console.log("Decoded Token:", decodedToken); // Log decoded token
                    const roles = decodedToken.roles;
                    setIsAdmin(roles.includes("admin"));
                    console.log("isAdmin:", isAdmin); // Log isAdmin
                } else {
                    console.warn("userToken not found in localStorage.");
                    setIsAdmin(false);
                }

               
                    console.log("Fetching all bookings..."); // Log before API call
                    const response = await axios.get("http://localhost:8097/api/bookings", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log("API Response:", response.data); // Log API response data
                    setBookings(response.data);
               
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [isAdmin, navigate]);

    

   
    const handleDelete = (bookingId) => {
        setDeleteBookingId(bookingId);
    };

    const closeDeleteForm = () => {
        setDeleteBookingId(null);
    };

    

    return (
        <Nav>
            <div className="container booking-container">
                <br />
                <h2 className="text-center mb-4">All Bookings</h2>

                {loading ? (
                    <div className="loading-spinner"></div>
                ) : bookings && bookings.length === 0 ? (
                    <p className="empty-message">No bookings available.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Room ID</th>
                                    <th>Guest ID</th>
                                    <th>Check-in Date</th>
                                    <th>Check-out Date</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.bookingId}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.roomId}</td>
                                        <td>{booking.guestId}</td>
                                        <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                        <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                        <td>${booking.price}</td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <button className="btn btn-info btn-sm" onClick={() => handleDelete(booking.bookingId)}>Delete</button>
                                                    
                                                </div>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {deleteBookingId && (
                    <DeleteBooking bookingId={deleteBookingId} onClose={closeDeleteForm} bookings={bookings} setBookings={setBookings} />
                )}
            </div>
        </Nav>
    );
};

export default FindAllBookings;
