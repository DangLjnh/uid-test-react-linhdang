// import React from 'react';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  return (
    <div>
      <h1>Create New Product</h1>
      <p>This is where you will add the form to create a new product.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default CreateProduct;