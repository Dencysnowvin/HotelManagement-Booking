import React ,{useState}from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Registers = () => {
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      roles:"user",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
      console.log("handleChange - roles:", e.target.value); 
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        const res = await axios.post("http://localhost:9194/auth/new", user);
        console.log(res);
        //localStorage.setItem("userRole", user.roles);
        alert("User Registration Successful!");
        navigate("/logins"); // Redirect to login page
      } catch (error) {
        console.log("REGISTRATION ERROR", error);
        setError("Registration failed. Please try again.");
      }
    };
   
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center">User Registration</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                        className="form-control"
                        id="roles"
                        name="roles"
                        value={user.roles}
                        onChange={handleChange}
                        >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p className="text-center mt-3">
              Already registered? <Link to="/user-login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
export default Registers


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
 
// const UserRegister = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
 
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:3434/user/register", user);
//       console.log(res);
//       alert("User Registration Successful!");
//       navigate("/userlogin"); // Redirect to login page
//     } catch (error) {
//       console.log("REGISTRATION ERROR", error);
//       setError("Registration failed. Please try again.");
//     }
//   };
 
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="card" style={{ width: "30rem" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center">User Registration</h2>
//           {error && <p className="text-danger text-center">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 className="form-control"
//                 value={user.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={user.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 value={user.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">Register</button>
//           </form>
//           <p className="text-center mt-3">
//             Already registered? <Link to="/user-login">Login here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default UserRegister;