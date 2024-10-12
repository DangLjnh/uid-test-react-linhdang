// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states/store';

// Import your components
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import CreateProduct from './pages/create-product/CreateProduct';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;