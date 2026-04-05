import React from 'react';
import '../App.css'; 
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
const ProductFooter = () => {
  return (
    <footer>
      
      <div className="footer-content">
        <div className="footer">
          <h2 className='footer-h2 product-footer-h2'>FUZZIES</h2>
          <p className="info">
            Discover premium pet food and accessories that nurture your pet's well-being and joy.
          </p>
          
          <div className='email-footer product-email-footer'>
            <h3 className='email-h3-footer'>Want to hear from us?</h3>
            <div className='email-placeholder-footer'>
            <input type="email" placeholder="Enter your email ID" className='input-footer' />
            <button className='email-btn'>SUBMIT</button>
            </div>
            <p className='email-para'>Reach us: supportfuzzies@gmail.com</p>
          </div>
          <h2 className='connect-h3-footer'>Connect with us</h2>
          <div className="socials">
            <span><a href="#"><FaFacebookF /></a></span>
            <span><a href="#"><FaInstagram /></a></span>
            <span><a href="#"><FaTwitter /></a></span>
            <span><a href="#"><FaLinkedinIn /></a></span>
          </div>
          <div className="footer-bar">
            Copyright © 2024 Fuzzies. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProductFooter;
