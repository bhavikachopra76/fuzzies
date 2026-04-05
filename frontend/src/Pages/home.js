import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Components/footer';
import HeroSection from '../Components/HeroSection'; 
import CategorySection from '../Components/CategorySection'; 
import FeaturesSection from '../Components/FeaturesSection'; 
import BrandsSection from '../Components/BrandsSection';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  return (
    <main>
      <HeroSection />
      <CategorySection />  
      <FeaturesSection />
      <BrandsSection />
      <Footer />
    </main>
  );
};

export default Home;
