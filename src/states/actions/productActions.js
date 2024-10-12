// states/actions/productActions.js
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:3000/products';

// Action to fetch products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    const response = await axios.get(API_URL); // Call to the fake API
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

// Action to create a product
export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, product); // Call to the fake API
    dispatch({
      type: 'CREATE_PRODUCT',
      payload: response.data, // The newly created product from the API response
    });
  } catch (error) {
    console.error('Error creating product', error);
  }
};