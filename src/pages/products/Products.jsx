// import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div>
      <h1>Our Products</h1>
      <p>This is where you will list your products.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Products;