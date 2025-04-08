import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-content">
          <div className="about-text">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Little Lemon is a charming Mediterranean restaurant, owned by two Italian brothers, Mario and Adrian. 
              They moved to the United States to pursue their shared dream of owning a restaurant.
            </p>
            <p>
              Each dish tells a story from their family cookbook, passed down through generations. 
              We believe in fresh ingredients, authentic recipes, and a warm, welcoming atmosphere.
            </p>
          </div>
          <div className="about-images">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3" 
              alt="Restaurant interior" 
              className="about-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 