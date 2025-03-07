import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [newRoom, setNewRoom] = useState({
    roomNo: '',
    roomType: 'SINGLE', // Default value
    maxOccupancy: 1,
    price: 0,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:9194/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleCreate = () => {
    setShowCreateForm(true);
    setShowUpdateForm(false);
    setShowDeleteForm(false);
  };

  const handleUpdate = (room) => {
    setShowUpdateForm(true);
    setShowCreateForm(false);
    setShowDeleteForm(false);
    setSelectedRoom(room);
    setNewRoom({
      roomNo: room.roomNo,
      roomType: room.roomType,
      maxOccupancy: room.maxOccupancy,
      price: room.price,
    });
  };

  const handleDelete = (room) => {
    setShowDeleteForm(true);
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setSelectedRoom(room);
  };

  const handleFormChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9194/api/rooms', newRoom);
      fetchRooms();
      setShowCreateForm(false);
      setNewRoom({
        roomNo: '',
        roomType: 'SINGLE',
        maxOccupancy: 1,
        price: 0,
      });
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9194/api/rooms/${selectedRoom.roomId}`, newRoom);
      fetchRooms();
      setShowUpdateForm(false);
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      await axios.delete(`http://localhost:9194/api/rooms/${selectedRoom.roomId}`);
      fetchRooms();
      setShowDeleteForm(false);
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Room Management</h2>

      <button onClick={handleCreate} className="btn btn-primary mb-3">Create Room</button>

      {showCreateForm && (
        <form onSubmit={handleSubmitCreate} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Room Number:</label>
            <input type="text" name="roomNo" value={newRoom.roomNo} onChange={handleFormChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Room Type:</label>
            <select name="roomType" value={newRoom.roomType} onChange={handleFormChange} className="form-select">
              <option value="SINGLE">Single</option>
              <option value="DELUXE">Deluxe</option>
              <option value="SUITE">Suite</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Max Occupancy:</label>
            <input type="number" name="maxOccupancy" value={newRoom.maxOccupancy} onChange={handleFormChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input type="number" name="price" value={newRoom.price} onChange={handleFormChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-success">Create</button>
        </form>
      )}

      {rooms.map((room) => (
        <div key={room.roomId} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Room {room.roomNo}</h5>
            <p className="card-text">Type: {room.roomType}</p>
            <p className="card-text">Max Occupancy: {room.maxOccupancy}</p>
            <p className="card-text">Price: ${room.price}</p>
            <button onClick={() => handleUpdate(room)} className="btn btn-sm btn-warning me-2">Update</button>
            <button onClick={() => handleDelete(room)} className="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      ))}

      {showUpdateForm && selectedRoom && (
        <form onSubmit={handleSubmitUpdate} className="mb-3">
          {/* Similar form as create, but pre-filled with selectedRoom data */}
          <div className="mb-3">
            <label className="form-label">Room Number:</label>
            <input type="text" name="roomNo" value={newRoom.roomNo} onChange={handleFormChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Room Type:</label>
            <select name="roomType" value={newRoom.roomType} onChange={handleFormChange} className="form-select">
              <option value="SINGLE">Single</option>
              <option value="Deluxe">Deluxe</option>
              <option value="SUITE">Suite</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Max Occupancy:</label>
            <input type="number" name="maxOccupancy" value={newRoom.maxOccupancy} onChange={handleFormChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input type="number" name="price" value={newRoom.price} onChange={handleFormChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-success">Update</button>
        </form>
      )}

      {showDeleteForm && selectedRoom && (
        <div>
          <p>Are you sure you want to delete room {selectedRoom.roomNo}?</p>
          <button onClick={handleSubmitDelete} className="btn btn-danger">Yes, Delete</button>
          <button onClick={() => setShowDeleteForm(false)} className="btn btn-secondary">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RoomManager;