import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const DeleteRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      
      await axiosInstance.delete(`/api/rooms/${roomId}`);
      alert("Room deleted successfully!");
      navigate("/viewrooms");
    } catch (error) {
      console.error("Error deleting room:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      alert("Error deleting room. Check console.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Delete Room</h2>
      <p>Are you sure you want to delete room with ID: {roomId}?</p>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete Room
      </button>
      <button onClick={() => navigate("/viewrooms")} className="btn btn-secondary">
        Cancel
      </button>
    </div>
  );
};

export default DeleteRoom;
