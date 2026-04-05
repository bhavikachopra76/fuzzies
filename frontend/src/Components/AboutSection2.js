import React from 'react';
import Accordion from './Accordian';
const AboutSection2 = () => {
  return (
    <section className="about-section2">
      <div className="about-sec2-content">
        <div className='faq-section'> 
        <img className="FAQ" src="FAQ.png" alt="FAQ" />
        </div>
        <div className="about-sec2-text">
        <Accordion />
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;