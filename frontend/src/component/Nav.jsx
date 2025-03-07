import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../CSS/Nav.css'; // Adjust the path to your CSS file

const Nav = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const roles = decodedToken.roles;
                setIsAdmin(roles.includes('admin'));
                setIsUser(roles.includes('user')); // Adjust role name if needed
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.warn('userToken not found in localStorage.');
            setIsAdmin(false);
        }
    }, []);
    console.log("isAdmin:", isAdmin)
    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg nav-style sticky-nav">
                <div className="container">
                    <Link className="navbar-brand brand-style" to="/layout">
                        Celestial Stay
                    </Link>
                    <ul className="navbar-nav">
                        
                        {isUser && (
                            <>
                            <li className="nav-item">
                            <Link
                                className={`nav-link link-style ${location.pathname === '/roomlisting' ? 'active' : ''}`}
                                to="/roomlisting"
                            >
                                Rooms
                            </Link>
                        </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link link-style ${location.pathname === '/findmybooking' ? 'active' : ''}`}
                                    to="/findmybooking"
                                >
                                    Find My Bookings
                                </Link>
                            </li>
                            <li className="nav-item">
                            <Link
                                className={`nav-link link-style ${location.pathname === '/paymantstatus' ? 'active' : ''}`}
                                to="/paymentstatus"
                            >
                                Payment Status
                            </Link>
                        </li>
                        </>
                        )}
                        {isAdmin && (
                            <>
                            <li className="nav-item">
                                <Link
                                className={`nav-link link-style ${location.pathname === '/viewrooms' ? 'active' : ''}`}
                                to="/viewrooms"
                            >
                                Rooms
                            </Link>
                        </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link link-style ${location.pathname === '/createroom' ? 'active' : ''}`}
                                        to="/createroom"
                                    >
                                        Create Room
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link link-style ${location.pathname === '/findallbookings' ? 'active' : ''}`}
                                        to="/findallbookings"
                                    >
                                        Find All Bookings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link link-style ${location.pathname === '/paytable' ? 'active' : ''}`}
                                        to="/paytable"
                                    >
                                        Payments
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link
                                className={`nav-link link-style ${location.pathname === '/services' ? 'active' : ''}`}
                                to="/services"
                            >
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link link-style ${location.pathname === '/about' ? 'active' : ''}`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link link-style" to="/">
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </div>
    );
};

export default Nav;