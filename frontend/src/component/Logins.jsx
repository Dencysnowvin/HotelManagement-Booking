import React , { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Logins = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        
          const response = await axios.post("http://localhost:9194/auth/authenticate", credentials);
          console.log("Response Data:", response.data);
          const token = response.data;
          console.log("Token received:", token);
          localStorage.setItem("userToken", token);
          console.log("Token in localStorage:", localStorage.getItem("userToken")); // Add this line
          alert("Login Successful!");
         
            navigate("/layout");
        
      } catch (error) {
          console.error("Login Error:", error);
          setError("Invalid username or password. Please try again.");
      }console.log("hi")
  };
   
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center">User Login</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={credentials.username}
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
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/registers">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

export default Logins


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
 
// const UserLogin = () => {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
 
//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post("http://localhost:3434/user/authenticate", credentials);
//       const token = response.data.token;
 
//       localStorage.setItem("userToken", token); // Store token in localStorage
//       alert("Login Successful!");
//       navigate("/viewpolicyuser"); // Redirect to UserViewAllPolicy page
//     } catch (error) {
//       setError("Invalid username or password. Please try again.");
//     }
//   };
 
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="card" style={{ width: "30rem" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center">User Login</h2>
//           {error && <p className="text-danger text-center">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 className="form-control"
//                 value={credentials.username}
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
//                 value={credentials.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">Login</button>
//           </form>
//           <p className="text-center mt-3">
//             Don't have an account? <Link to="/user-register">Register here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default UserLogin;
 