import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
    const headerBackgroundImage = 'https://th.bing.com/th/id/R.fac43047864193ebc599fd32f00ee371?rik=IRt%2b3mbTddArBA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-A7EcPsl4jCM%2fUmJ1mZlaGeI%2fAAAAAAAAR3g%2f8Z_8HyVp9OU%2fs1600%2f006815-01-hotel-exterior-pool-night.jpg&ehk=hLLbDMfuPOH9yExUK9kp1aG%2bFRktuX9UkU30AOjRB8U%3d&risl=&pid=ImgRaw&r=0'; // Example image URL

    return (
        <div className="d-flex flex-column min-vh-100">
            <Nav>
                <header 
                    className="d-flex justify-content-center align-items-center flex-grow-1"
                    style={{
                        backgroundImage: `url(${headerBackgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white', // Ensure text is visible
                        textAlign: 'center', // Center text horizontally
                        padding: '100px 0', // Add some padding
                        position: 'relative', // For overlay if needed
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                    }}></div>
                    <h1 style={{ position: 'relative', zIndex: 1 }}>Welcome to Celestial Stay</h1>
                </header>
                <footer className="bg-dark text-white text-center py-3">
                    <p>© 2025 Celestial Stay. All rights reserved.</p>
                    <p>Contact us: <a href="mailto:info@celestialstay.com" className="text-white">info@celestialstay.com</a></p>
                </footer>
            </Nav>
        </div>
    );
};

export default Layout;