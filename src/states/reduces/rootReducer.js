import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productReducer,
  // Add other reducers here as your app grows
});

export default rootReducer;