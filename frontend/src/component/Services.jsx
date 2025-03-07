import React from 'react';
import '../CSS/Services.css'; // Create Services.css
import { FaWifi, FaSwimmingPool, FaParking, FaConciergeBell, FaUtensils, FaDumbbell } from 'react-icons/fa'; // Import icons
import Nav from './Nav';

const Services = () => {
    const services = [
        {
            icon: <FaWifi />,
            name: "Free Wi-Fi",
            description: "Stay connected with our high-speed internet access.",
        },
        {
            icon: <FaSwimmingPool />,
            name: "Swimming Pool",
            description: "Enjoy a refreshing dip in our outdoor swimming pool.",
        },
        {
            icon: <FaParking />,
            name: "Free Parking",
            description: "Complimentary parking for all our guests.",
        },
        {
            icon: <FaConciergeBell />,
            name: "Concierge Service",
            description: "Our concierge is available to assist you with any needs.",
        },
        {
            icon: <FaUtensils />,
            name: "Restaurant",
            description: "Savor delicious meals at our on-site restaurant.",
        },
        {
            icon: <FaDumbbell />,
            name: "Gym",
            description: "Stay fit with our fully equipped gym.",
        },
        // Add more services as needed
    ];

    return (
        <Nav>
        <div className="services-container">
            <h2>Our Services</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
        </Nav>
    );
};

export default Services;