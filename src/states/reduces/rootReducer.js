import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import productReducer from './productReducer';
import localStorageProductReducer from './localStorageProductReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productReducer,
  localStorageProducts: localStorageProductReducer,
  // Add other reducers here as your app grows
});

export default rootReducer;