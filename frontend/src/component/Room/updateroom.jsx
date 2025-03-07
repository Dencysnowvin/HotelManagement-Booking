import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const UpdateRoom = ({ roomId, onClose, rooms, setRooms }) => {
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "Basic",
    maxOccupancy: 1,
    price: 0,
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        
        const response = await axiosInstance.get(`/api/rooms/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
        alert("Error fetching room. Check console.");
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(`http://localhost:8097/api/rooms/${roomId}`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Room updated successfully!");
      onClose();
      const updatedRooms = rooms.map((currentRoom) =>
        currentRoom.roomId === roomId ? room : currentRoom
      );
      setRooms(updatedRooms);
    } catch (error) {
      console.error("Error updating room:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      alert("Error updating room. Check console.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room Number:</label>
          <input
            type="text"
            name="roomNo"
            value={room.roomNo}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Room Type:</label>
          <select
            name="roomType"
            value={room.roomType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Basic">Basic</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Max Occupancy:</label>
          <input
            type="number"
            name="maxOccupancy"
            value={room.maxOccupancy}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Room
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;