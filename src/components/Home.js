import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className="cta-button">Reserve a Table</button>
        </div>
      </section>
      
      <section className="specials">
        <div className="section-header">
          <h2>This week's specials!</h2>
          <button className="menu-button">Online Menu</button>
        </div>
        <div className="specials-cards">
          {/* Add special menu items here */}
        </div>
      </section>

      <section className="testimonials">
        <h2>What our customers say!</h2>
        <div className="testimonials-grid">
          {/* Add testimonials here */}
        </div>
      </section>
    </div>
  );
};

export default Home; 