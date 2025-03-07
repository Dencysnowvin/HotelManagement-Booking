import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../Nav";
import { jwtDecode } from 'jwt-decode';
import '../../CSS/CreateBooking.css'; 
import axiosInstance from "../axiosInstance";

const CreateBooking = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialRoomId = searchParams.get("roomId") || "";
    const initialCheckInDate = searchParams.get("checkInDate") || "";
    const initialCheckOutDate = searchParams.get("checkOutDate") || "";
    const initialPrice = searchParams.get("price") || 0;

    const [guestId, setGuestId] = useState("");
    const [newBooking, setNewBooking] = useState({
        roomId: initialRoomId,
        guestId: "",
        checkInDate: initialCheckInDate,
        checkOutDate: initialCheckOutDate,
        price: parseFloat(initialPrice),
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setGuestId(decodedToken.userId);
                setNewBooking((prevBooking) => ({
                    ...prevBooking,
                    guestId: decodedToken.userId,
                }));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            console.warn("userToken not found in localStorage.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            await axiosInstance.post("/api/bookings", newBooking);
            alert("Booking created successfully!");
            navigate("/findmybooking");
        } catch (error) {
            console.error("Error creating booking:", error);
            if (error.response) {
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
                if (error.response.status === 400) {
                    alert("Bad request. Please check your input data.");
                } else if (error.response.status === 403) {
                    alert("You are not authorized to create a booking.");
                } else if (error.response.status === 500) {
                    alert("Internal server error. Please try again later.");
                } else {
                    alert("An unexpected error occurred.");
                }
            } else if (error.request) {
                console.error("Request:", error.request);
                alert("Network error. Please check your connection.");
            } else {
                console.error("Error:", error.message);
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <Nav>
            <div className="container create-booking-container">
                <div className="booking-card">
                    <h2>Create Booking</h2>
                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="form-group">
                            <label className="form-label">Room ID:</label>
                            <input
                                type="number"
                                name="roomId"
                                value={newBooking.roomId}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Guest ID:</label>
                            <input
                                type="number"
                                name="guestId"
                                value={guestId}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Check-in Date:</label>
                            <input
                                type="date"
                                name="checkInDate"
                                value={newBooking.checkInDate}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Check-out Date:</label>
                            <input
                                type="date"
                                name="checkOutDate"
                                value={newBooking.checkOutDate}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="form-group" style={{ display: "none" }}>
                            <label className="form-label">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={newBooking.price}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create Booking
                        </button>
                    </form>
                </div>
            </div>
        </Nav>
    );
};

export default CreateBooking;