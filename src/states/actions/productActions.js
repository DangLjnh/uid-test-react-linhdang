import axios from 'axios';
import { API_URL } from '../../configs/environment';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    const response = await axios.get(`${API_URL}/products`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    dispatch({
      type: 'CREATE_PRODUCT',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating product', error);
  }
};