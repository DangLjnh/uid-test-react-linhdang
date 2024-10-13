import { useState } from 'react';

const useLocalStorageProduct = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    setProducts(products);
  };

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

  const fetchProducts = () => {
    return requestHandler(async () => {
      const storedProducts = localStorage.getItem('products');
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
      setProducts(parsedProducts);
    });
  };

  const fetchProduct = (id) => {
    return requestHandler(async () => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const product = storedProducts.find((prod) => prod.id === id);
      return product || null;
    });
  };

  // Create a new product and store it in localStorage
  const createProduct = (newProduct) => {
    return requestHandler(async () => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = [...storedProducts, newProduct];
      saveToLocalStorage(updatedProducts);
      return newProduct;
    });
  };

  // Update an existing product in localStorage
  const updateProduct = (id, updatedProduct) => {
    return requestHandler(async () => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = storedProducts.map((prod) =>
        prod.id === id ? { ...prod, ...updatedProduct } : prod
      );
      saveToLocalStorage(updatedProducts);
      return updatedProduct;
    });
  };

  // Delete a product by ID from localStorage
  const deleteProduct = (id) => {
    return requestHandler(async () => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = storedProducts.filter((prod) => prod.id !== id);
      saveToLocalStorage(updatedProducts);
      return id;
    });
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useLocalStorageProduct;