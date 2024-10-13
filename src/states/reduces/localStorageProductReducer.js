const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  const localStorageProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'CREATE_PRODUCT':
        return { ...state, products: [...state.products, action.payload] };
      default:
        return state;
    }
  };
  
  export default localStorageProductReducer;