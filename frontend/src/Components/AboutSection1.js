import React from 'react';

const AboutSection1 = () => {
  return (
    <section className="about-section1">
      <img className="sec1-paw" src="about-sec1-paw.png" alt="Paw" />
      <div className="about-sec1-content">
        <div className="sec1-img-container">
          <img src="about-section1.png" alt="About Section 1" className="sec1-img" />
        </div>
        <div className="sec1-text">
          <img src="sec1-logo.png" alt="Sec1 Logo" />
          <h1>Happy Pets,</h1>
          <h1>Happy Humans</h1>
          <p>
            Welcome to Fuzzies, your one-stop shop for all things pet food and accessories! At Fuzzies, 
            we believe that every pet deserves the best care, love, and nutrition. That's why we've 
            curated a range of high-quality, wholesome pet food and premium accessories to keep your 
            furry friends happy, healthy, and stylish. Join us on our mission to create a world where 
            every pet is pampered and cherished!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection1;
