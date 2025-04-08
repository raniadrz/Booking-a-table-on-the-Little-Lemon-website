import React from "react";
import { Link } from "react-router-dom";
import small_logo from "../images/small_logo.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={small_logo} alt="Little Lemon Logo" />
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                </div>
                <div className="footer-links">
                    <h3>Navigation</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/reservations">Reservations</Link></li>
                        <li><Link to="/order">Order Online</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            123 Little Lemon St, Chicago, IL 60601
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            (312) 555-0123
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i>
                            contact@littlelemon.com
                        </li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>Connect With Us</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;