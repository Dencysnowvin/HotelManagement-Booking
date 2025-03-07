import React from 'react';
import { Link } from 'react-router-dom';
import hotel_img from '../assets/hotel-img.jpeg';
const Landingpage = () => {
    const backgroundImageUrl = hotel_img;
    const buttonColor = 'blue';

    return (
        <div 
            className="bg-light text-dark d-flex justify-content-center align-items-center vh-100" 
            style={{ 
                backgroundImage: `url(${backgroundImageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            <section 
                className="text-center p-5 rounded shadow-lg" 
                style={{ 
                    maxWidth: '800px', // Increased section width
                    padding: '3rem',
                    borderRadius: '15px',
                    backgroundColor: 'white' // Set background to white
                }}
            >
                <h1 className="display-4 mb-4" style={{ color: '#333' }}>Celestial Stay</h1>
                <div 
                    className="mb-4 p-3 rounded"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
                    }}
                >
                    <p className="lead" style={{color: 'white'}}>
                        Welcome to Celestial Stay, your home away from home. Enjoy luxurious rooms, top-notch amenities, and exceptional service. Whether you're here for business or leisure, we ensure a comfortable and memorable stay.
                    </p>
                </div>
                
                <div>
                    <Link 
                        to="/registers" 
                        className="btn m-2" 
                        style={{ 
                            backgroundColor: buttonColor, 
                            color: 'white', 
                            padding: '12px 25px', 
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        Register
                    </Link>
                    <Link 
                        to="/logins" 
                        className="btn m-2" 
                        style={{ 
                            backgroundColor: buttonColor, 
                            color: 'white', 
                            padding: '12px 25px', 
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' 
                        }}
                    >
                        Login
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Landingpage;

