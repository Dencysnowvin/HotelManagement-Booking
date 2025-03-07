import React from 'react';
import Nav from './Nav'; 

import '../CSS/About.css'

const About = () => {
    return (
        <Nav>
            <div className="about-container">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>About Celestial Stay</h1>
                        <p>Your gateway to unforgettable travel experiences.</p>
                    </div>
                </section>

                <section className="overview-section">
                    <div className="container">
                        <h2>Our Mission</h2>
                        <p>
                            At Celestial Stay, we believe that travel enriches lives. Our mission is to provide seamless and enjoyable booking experiences, offering a wide range of comfortable and affordable accommodations.
                        </p>
                        <p>
                            We are dedicated to ensuring that every guest finds the perfect place to stay, whether it's for a relaxing vacation or a productive business trip.
                        </p>
                    </div>
                </section>

                <section className="team-section">
                    <div className="container">
                        <h2>Our Team</h2>
                        <div className="team-members">
                            <div className="team-member">
                                <h3>John Doe</h3>
                                <p>Founder & CEO</p>
                                <p>Passionate about creating exceptional travel experiences.</p>
                            </div>
                            <div className="team-member">
                                <h3>Jane Smith</h3>
                                <p>Lead Developer</p>
                                <p>Dedicated to building a user-friendly platform.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="container">
                        <h2>Key Features</h2>
                        <ul className="features-list">
                            <li>Easy and secure booking process.</li>
                            <li>Wide selection of rooms and accommodations.</li>
                            <li>Detailed room information and photos.</li>
                            <li>24/7 customer support.</li>
                            <li>Secure payment options.</li>
                        </ul>
                    </div>
                </section>

                <section className="contact-section">
                      <div className="container">
                       <h2>Contact Us</h2>
                       <p>Have questions or feedback? We'd love to hear from you!</p>
                       <p>Email us at: <a href="mailto:info@celestialstay.com" className="contact-email">info@celestialstay.com</a></p>
                       </div>
                </section>

            </div>
        </Nav>
    );
};

export default About;