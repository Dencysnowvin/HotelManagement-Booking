import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import axiosInstance from "../axiosInstance";


const CreateRoom = () => {
  const [newRoom, setNewRoom] = useState({
    roomNo: "",
    roomType: "Basic",
    maxOccupancy: 1,
    price: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/rooms", newRoom);
      alert("Room created successfully!");
      navigate("/viewrooms");
    } catch (error) {
      console.error("Error creating room:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      alert("Error creating room. Check console.");
    }
  };

  return (
    <Nav>
            <div className="container room-listing-container">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Create Room</h2>
                        <form onSubmit={handleSubmit} className="room-listing-form">
                            <div className="form-group">
                                <label htmlFor="roomNo" className="form-label">Room Number:</label>
                                <input type="number" name="roomNo" id="roomNo" value={newRoom.roomNo} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="roomType" className="form-label">Room Type:</label>
                                <select name="roomType" id="roomType" value={newRoom.roomType} onChange={handleChange} className="form-select">
                                    <option value="Basic">Basic</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="maxOccupancy" className="form-label">Max Occupancy:</label>
                                <input type="number" name="maxOccupancy" id="maxOccupancy" value={newRoom.maxOccupancy} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Price:</label>
                                <input type="number" name="price" id="price" value={newRoom.price} onChange={handleChange} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create Room</button>
                        </form>
                    </div>
                </div>
            </div>
        </Nav>
    );
};

export default CreateRoom;