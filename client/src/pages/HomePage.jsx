import React from 'react';
import './costume.css';
import home from '../assets/home.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            {/* Header */}

            {/* Home Section with Background Image */}
            <section id="home" className="hero">
                <div className="hero-text">
                    <h1>Find Your Perfect Costume</h1>
                    <p>From superheroes to fantasy, we have it all!</p>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="about">
                <h2>About Us</h2>
                <p>Welcome to SwayStyle — your destination for stylish, high-quality costumes! We believe that costumes should not only be fun but also fashionable and comfortable. Whether it's for a party, cosplay, or Halloween, we offer unique designs to help you stand out.

At SwayStyle, customer satisfaction is our top priority. We’re committed to providing an effortless shopping experience, fast shipping, and costumes that make you feel confident and stylish.

Explore our collection and express your style with SwayStyle!

</p>
            </section>

            

            {/* Footer Section */}
            <footer>
                <div className="footer-content">
                    <p>&copy; 2024 SWAYSTYLE. All Rights Reserved.</p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Home;
