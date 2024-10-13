import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/home/Home';
import Products from './pages/products/Products';
import CreateProduct from './pages/create-product/CreateProduct';
import UpdateProduct from "./pages/update-product/UpdateProduct";
import AppLayout from './layouts/AppLayout';
import { useEffect } from 'react';
import { API_PRODUCT_URL } from './environments/variables';

function App() {
  useEffect(() => {
    const fetchAndStoreData = async () => {
      try {
        if (!localStorage.getItem('products')) {
          const response = await axios.get(`${API_PRODUCT_URL}/products`);
          const data = response.data;
          localStorage.setItem('products', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching the JSON file:', error);
      }
    };

    fetchAndStoreData();
  }, []);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;