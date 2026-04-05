import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const categories = ['Dogs', 'Cats', 'Birds', 'Others', 'Small Pets'];

  return (
    <div>
      <ul>
        {categories.map(category => (
          <li key={category}>
            
            <Link to={`/products/${category}`}>
              <button>{category}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
