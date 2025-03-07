import React from 'react';
import { useNavigate } from 'react-router-dom';
import basic from'../../assets/basic-room.png';
import img2 from'../../assets/img2.jpg';
import img3 from'../../assets/img3.jpg';
import { jwtDecode } from 'jwt-decode';
import '../../CSS/RoomDetails.css'; // Import your CSS file

function RoomDetails({ room, onClose }) {
    const navigate = useNavigate();

    if (!room || !room.roomType) return null;

    const roomTypeImages = {
        Basic: [basic],
        Deluxe: [img2],
        Premium: [img3],
    };

    const amenities = {
        Basic: ["Free Wi-Fi", "TV", "Basic toiletries"],
        Deluxe: ["Free Wi-Fi", "TV", "Mini-fridge", "Premium toiletries", "City view"],
        Premium: ["Free Wi-Fi", "TV", "Mini-fridge", "Premium toiletries", "Balcony", "Jacuzzi", "Breakfast included"],
    };

    const descriptions = {
        Basic: "A comfortable room with essential amenities for a pleasant stay.",
        Deluxe: "A spacious room with added luxuries and a beautiful city view.",
        Premium: "An exquisite room with top-notch amenities and a luxurious experience.",
    };

    const handleBook = () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const guestId = decodedToken.userId;
            const checkInDate = localStorage.getItem('checkInDate');
            const checkOutDate = localStorage.getItem('checkOutDate');

            navigate(`/createbooking?roomId=${room.roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&price=${room.price}&guestId=${guestId}`);
        } else {
            console.warn('userToken not found in localStorage.');
        }
    };

    return (
        <div className="room-details-modal">
            <div className="room-details-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Room {room.roomNo} Details</h2>
                {/* Add image here */}
                {roomTypeImages[room.roomType] && roomTypeImages[room.roomType][0] && (
                    <img
                        src={roomTypeImages[room.roomType][0]}
                        alt={`${room.roomType} Room`}
                        className="room-detail-image"
                    />
                )}
                <div className="room-info">
                    <p className="room-description">{descriptions[room.roomType]}</p>
                    <h3>Amenities</h3>
                    <ul className="amenities-list">
                        {amenities[room.roomType].map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
                <button className="book-button" onClick={handleBook}>
                    Book Now
                </button>
            </div>
        </div>
    );
}

export default RoomDetails;