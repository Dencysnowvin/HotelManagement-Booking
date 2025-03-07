import React from 'react';
import axios from 'axios';


const DeleteBooking = ({ bookingId, onClose, bookings, setBookings }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("userToken");
            await axios.delete(`http://localhost:8097/api/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Booking deleted successfully!");
            setBookings(bookings.filter((booking) => booking.bookingId !== bookingId));
            onClose();
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert("Failed to delete booking.");
        }
    };

    return (
        <div className="delete-booking-modal">
            <div className="delete-booking-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this booking?</p>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteBooking;