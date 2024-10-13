export const fetchProducts = () => (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

// Action to create a product and save it to localStorage
export const createProduct = (product) => (dispatch) => {
  try {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    
    const updatedProducts = [...products, product]; // Add the new product to the existing ones
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save to localStorage

    dispatch({
      type: 'CREATE_PRODUCT',
      payload: product, // The newly created product
    });
  } catch (error) {
    console.error('Error creating product', error);
  }
};

// Action to update an existing product in localStorage
export const updateProduct = (id, updatedProduct) => (dispatch) => {
  try {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save updated products to localStorage

    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: updatedProduct, // The updated product
    });
  } catch (error) {
    console.error('Error updating product', error);
  }
};

// Action to delete a product by ID from localStorage
export const deleteProduct = (id) => (dispatch) => {
  try {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save updated products to localStorage

    dispatch({
      type: 'DELETE_PRODUCT',
      payload: id, // ID of the deleted product
    });
  } catch (error) {
    console.error('Error deleting product', error);
  }
};