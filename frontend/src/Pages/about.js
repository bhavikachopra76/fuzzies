import React from 'react';
import './about.css'; 

import AboutHeader from '../Components/AboutHeader'; 
import AboutSection1 from '../Components/AboutSection1'; 
import AboutSection2 from '../Components/AboutSection2'; 
import AboutSection3 from '../Components/AboutSection3';
// import Header from '../Components/header';
import Footer from '../Components/footer';

const AboutPage = () => {
  return (
    <main>
      {/* <Header/> */}
      <AboutHeader/>
      <AboutSection1 />
      <AboutSection2 />
      <AboutSection3/>
      <Footer/>
    </main>
  );
};

export default AboutPage;