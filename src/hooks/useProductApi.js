import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../environments/variables';

const useProductApi = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reusable function for making API requests with error handling
  const requestHandler = async (callback) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callback();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = () => {
    return requestHandler(async () => {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    });
  };

  // Fetch a single product by ID
  const fetchProduct = (id) => {
    return requestHandler(async () => {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    });
  };

  // Create a new product
  const createProduct = (newProduct) => {
    return requestHandler(async () => {
      const response = await axios.post(`${API_URL}/products`, newProduct, {
        headers: { 'Content-Type': 'application/json' },
      });
      await fetchProducts();
      return response.data;
    });
  };

  // Update an existing product
  const updateProduct = (id, updatedProduct) => {
    return requestHandler(async () => {
      const response = await axios.put(`${API_URL}/products/${id}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
      });
        await fetchProducts();
        return response.data;
    });
  };

  // Delete a product by ID
  const deleteProduct = (id) => {
    return requestHandler(async () => {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        await fetchProducts();
        return response.data;
    });
  };

  return { products, isLoading, error, fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct };
};

export default useProductApi;