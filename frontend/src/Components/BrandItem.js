
import React from 'react';

const BrandItem = ({ src, alt }) => {
  return (
    <div className="brand">
      <img src={src} alt={alt} className="branditems" />
    </div>
  );
};

export default BrandItem;
