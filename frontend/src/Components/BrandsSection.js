// src/components/BrandsSection.js
import React from 'react';
import BrandItem from './BrandItem';
import '../App.css'; 
const BrandsSection = () => {
  // Array of brand information
  const brands = [
    { src: 'brand1.png', alt: 'Brand 1' },
    { src: 'brand2.png', alt: 'Brand 2' },
    { src: 'brand3.png', alt: 'Brand 3' },
    { src: 'brand4.png', alt: 'Brand 4' },
    { src: 'brand5.png', alt: 'Brand 5' },
    { src: 'brand6.png', alt: 'Brand 6' },
    { src: 'brand7.png', alt: 'Brand 7' }
  ];

  return (
    <section className="section3">
      <div className="brands">
        {brands.map((brand, index) => (
          <BrandItem key={index} src={brand.src} alt={brand.alt} />
        ))}
      </div>
    </section>
  );
};

export default BrandsSection;
