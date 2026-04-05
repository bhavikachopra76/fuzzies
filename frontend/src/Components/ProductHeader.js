import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import './ProductHeader.css'; 

const ProductHeader = () => {
  return (
    <div className="Product-header">
        <nav className='product-nav'>
        <ul className='product-ul'>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">WHO WE ARE</Link></li>
          <div className="search-bar">
            <input placeholder="What are you looking for?" className="search-input" />
            <div className="search-icon"><FaSearch /></div>
          </div>
          <li><Link to="/track"><FaLocationArrow size={16} className='header-icons'/>TRACK</Link></li>
          <li><Link to="/login"><FaUserAlt size={16} className='header-icons'/>LOGIN</Link></li>
          <li><Link to="/cart"><FaShoppingCart size={17} className='header-icons'/>CART</Link></li>
        </ul>
      </nav>
      
        
        
    </div>
  );
};

export default ProductHeader;