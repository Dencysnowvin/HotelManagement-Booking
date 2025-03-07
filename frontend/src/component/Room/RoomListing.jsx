import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UpdateRoom from './updateroom';
import Nav from '../Nav';
import '../../CSS/RoomListing.css'; 
import RoomDetails from './RoomDetails';
import basic from '../../assets/basic-room.png';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import axiosInstance from '../axiosInstance';

function RoomListing() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showRoomDetails, setShowRoomDetails] = useState(false);
  

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.roles;
            setIsAdmin(roles.includes('admin'));
        } else {
            console.warn('userToken not found in localStorage.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkInDate || !checkOutDate) {
            setError('Please select both check-in and check-out dates.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            
            const response = await axiosInstance.get('api/bookings/available-rooms', {
               
                params: {
                    checkInDate,
                    checkOutDate,
                    roomType: roomTypeFilter || null,
                },
            });
            setAvailableRooms(response.data);
        } catch (err) {
            setError(err.message || 'An error occurred.');
            console.error('Error fetching available rooms:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (roomId) => {
        try {
            const token = localStorage.getItem('userToken');
            await axios.delete(`http://localhost:8097/api/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Room Deleted Successfully!');
            setAvailableRooms(availableRooms.filter((room) => room.roomId !== roomId));
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Error deleting room. Check console.');
        }
    };

    const handleUpdate = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const closeUpdateForm = () => {
        setSelectedRoomId(null);
    };

    const handleViewBook = (room) => { 
        localStorage.setItem('checkInDate', checkInDate);
        localStorage.setItem('checkOutDate', checkOutDate);
        console.log("Room selected:", room);
        setSelectedRoom(room);
        setShowRoomDetails(true);
        console.log("Show Room Details:", showRoomDetails); 
    };

    const closeRoomDetails = () => {
        setShowRoomDetails(false);
        setSelectedRoom(null);
        console.log("Show Room Details:", showRoomDetails); // Log the state
    };

    const roomTypeImages = {
        Basic: basic,
        Deluxe: img2,
        Premium: img3,
    };

    return (
        <Nav>
            <div className="container room-listing-container">
                <h2>Check Room Availability</h2>
                <form onSubmit={handleSubmit} className="room-listing-form">
                    <div className="form-group">
                        <label className="form-label">Check-in Date:</label>
                        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Check-out Date:</label>
                        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Room Type:</label>
                        <select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)} className="form-select">
                            <option value="">All Types</option>
                            <option value="Basic">Basic</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}

                {availableRooms.length > 0 && (
                    <div>
                        <h3>Available Rooms:</h3>
                        <div className="row">
                            {availableRooms.map((room) => (
                                <div key={room.roomId} className="col-md-4 mb-4">
                                    <div className="card shadow-sm h-100 room-card">
                                        <img src={roomTypeImages[room.roomType]} className="card-img-top room-card-image" alt={`${room.roomType} Room`} />
                                        <div className="card-body room-card-body">
                                            <h5 className="card-title fw-bold room-card-title">Room {room.roomNo}</h5>
                                            <p className="card-text room-card-text">Type: {room.roomType}</p>
                                            <p className="card-text room-card-text">Max Occupancy: {room.maxOccupancy}</p>
                                            <p className="card-text room-card-text">Price: ${room.price}</p>
                                            <div className="d-flex flex-column mt-3">
                                                {isAdmin && (
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <button className="btn btn-success me-1" onClick={() => handleUpdate(room.roomId)}>
                                                            Update
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(room.roomId)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                                <button className="btn btn-primary" onClick={() => handleViewBook(room)}>
                                                    View/Book
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {availableRooms.length === 0 && !loading && error === null && (
                    <p>No rooms available for the selected dates and criteria.</p>
                )}
                
                {showRoomDetails && <RoomDetails room={selectedRoom} onClose={closeRoomDetails} />}
                {selectedRoomId && <UpdateRoom roomId={selectedRoomId} onClose={closeUpdateForm} rooms={availableRooms} setRooms={setAvailableRooms} />}
            </div>
        </Nav>
    );
}

export default RoomListing;