import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateRoom from "./updateroom";
import { jwtDecode } from "jwt-decode";
import Nav from "../Nav";
import axiosInstance from "../axiosInstance";

const ViewRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [roomTypeFilter, setRoomTypeFilter] = useState("");
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchRooms = async () => {
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

                let url = "/api/rooms";
                if (roomTypeFilter) {
                    url += `/type?roomType=${roomTypeFilter}`;
                }

                const response = await axiosInstance.get(url);
                if (response.data) {
                    setRooms(response.data);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, [roomTypeFilter]);

    const handleDelete = async (roomId) => {
        try {
            const token = localStorage.getItem("userToken");
            await axios.delete(`http://localhost:8097/api/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Room Deleted Successfully!");
            setRooms(rooms.filter((room) => room.roomId !== roomId));
        } catch (error) {
            console.error("Error deleting room:", error);
            alert("Error deleting room. Check console.");
        }
    };

    const handleUpdate = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const closeUpdateForm = () => {
        setSelectedRoomId(null);
    };

    const handleRoomTypeChange = (e) => {
        setRoomTypeFilter(e.target.value);
    };

    // const handleViewBook = (roomId) => {
    //     const token = localStorage.getItem("userToken");
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         const guestId = decodedToken.sub;
    //         navigate(`/createbooking?roomId=${roomId}&guestId=${guestId}`);
    //     } else {
    //         console.warn("userToken not found in localStorage.");
    //     }
    // };

    return (
        <Nav>
        <div className="container mt-5">
            

            <h2 className="text-center mb-4">Available Rooms</h2>

            <div className="mb-4 d-flex justify-content-center">
                <label htmlFor="roomTypeFilter" className="form-label me-2">Filter by Room Type:</label>
                <select className="form-select w-auto" id="roomTypeFilter" value={roomTypeFilter} onChange={handleRoomTypeChange}>
                    <option value="">All Rooms</option>
                    <option value="Basic">Basic</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center">Loading rooms...</p>
            ) : rooms && rooms.length === 0 ? (
                <p className="text-center">No rooms available.</p>
            ) : (
                <div className="row">
                    {rooms.map((room) => (
                        <div key={room.roomId} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Room {room.roomNo}</h5>
                                    <p className="card-text">Type: {room.roomType}</p>
                                    <p className="card-text">Max Occupancy: {room.maxOccupancy}</p>
                                    <p className="card-text">Price: ${room.price}</p>
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
                                        {/* <button className="btn btn-primary" onClick={() => handleViewBook(room.roomId)}>
                                            View/Book
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedRoomId && (
                <UpdateRoom roomId={selectedRoomId} onClose={closeUpdateForm} rooms={rooms} setRooms={setRooms} />
            )}
        </div>
        </Nav>
    );
};

export default ViewRooms;

















// import React, { useState, useEffect } from "react";
// import { Link} from "react-router-dom";
// import axios from "axios";
// import UpdateRoom from "./updateroom";// Import UpdateRoom
// import { jwtDecode } from "jwt-decode"; //import decode


// const ViewRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   //const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRooms = async () => {
//         try {
//             const token = localStorage.getItem("userToken");
//             if (token) {
//                 const decodedToken = jwtDecode(token);
//                 console.log("Decoded Token:", decodedToken);
//                 const roles = decodedToken.roles;
//                 console.log("Roles:", roles);
//                 //console.log(roles)
//                 setIsAdmin(roles.includes("admin"));
//             } else {
//                 console.warn("userToken not found in localStorage.");
//             }
//         //console.log("Token:", role);
//         const response = await axios.get("http://localhost:8097/api/rooms", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Fetched Rooms:", response.data);
//         if (response.data) {
//           setRooms(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };
//     fetchRooms();
//   }, []);

//   const handleDelete = async (roomId) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       await axios.delete(`http://localhost:8097/api/rooms/${roomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert("Room Deleted Successfully!");
//       setRooms(rooms.filter((room) => room.roomId !== roomId));
//     } catch (error) {
//       console.error("Error deleting room:", error);
//       if (error.response) {
//         console.error("Data:", error.response.data);
//         console.error("Status:", error.response.status);
//         console.error("Headers:", error.response.headers);
//       } else if (error.request) {
//         console.error("Request:", error.request);
//       } else {
//         console.error("Error:", error.message);
//       }
//       alert("Error deleting room. Check console.");
//     }
//   };

//   const handleUpdate = (roomId) => {
//     setSelectedRoomId(roomId);
//   };

//   const closeUpdateForm = () => {
//     setSelectedRoomId(null);
//   };

//   return (
//     <div className="container mt-5">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//         <div className="container-fluid">
//           <div className="collapse navbar-collapse justify-content-end">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link className="nav-link text-white" to="/layout">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-white btn btn-primary ms-2" to="/createroom">
//                   Add Room
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <h2 className="text-center mb-4">Available Rooms</h2>
//       {rooms && rooms.length === 0 ? (
//         <p className="text-center">No rooms available.</p>
//       ) : (
//         <div className="row">
//           {rooms.map((room) => (
//             <div key={room.roomId} className="col-md-4 mb-3">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">Room {room.roomNo}</h5>
//                   <p className="card-text">Type: {room.roomType}</p>
//                   <p className="card-text">Max Occupancy: {room.maxOccupancy}</p>
//                   <p className="card-text">Price: ${room.price}</p>
//                   <div className="d-flex justify-content-between">
//                   {isAdmin && (
//                       <>
//                         <button
//                           className="btn btn-success me-1"
//                           onClick={() => handleUpdate(room.roomId)}
//                         >
//                           Update
//                         </button>
//                         <button
//                           className="btn btn-danger me-1"
//                           onClick={() => handleDelete(room.roomId)}
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedRoomId && (
       
//         <UpdateRoom
//           roomId={selectedRoomId}
//           onClose={closeUpdateForm}
//           rooms={rooms}
//           setRooms={setRooms}
//         />
//       )}
//     </div>
//   );
// };

// export default ViewRooms;




