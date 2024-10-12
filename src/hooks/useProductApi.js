import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

const useProductApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Function to handle async calls
  const handleApiCall = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = () => {
    handleApiCall(() => axios.get(`${API_BASE_URL}/products`));
  };

  // Fetch a single product by id
  const fetchProduct = (id) => {
    handleApiCall(() => axios.get(`${API_BASE_URL}/products/${id}`));
  };

  // Create a new product
  const createProduct = (newProduct) => {
    handleApiCall(() => axios.post(`${API_BASE_URL}/products`, newProduct));
  };

  // Update a product by id
  const updateProduct = (id, updatedProduct) => {
    handleApiCall(() => axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct));
  };

  // Delete a product by id
  const deleteProduct = (id) => {
    handleApiCall(() => axios.delete(`${API_BASE_URL}/products/${id}`));
  };

  // Bulk update products
  const bulkUpdateProducts = (updatedProducts) => {
    handleApiCall(() => axios.put(`${API_BASE_URL}/products/bulk-update`, updatedProducts));
  };

  // Bulk delete products
  const bulkDeleteProducts = (ids) => {
    handleApiCall(() => axios.post(`${API_BASE_URL}/products/bulk-delete`, { ids }));
  };

  return {
    data,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkUpdateProducts,
    bulkDeleteProducts,
  };
};

export default useProductApi;