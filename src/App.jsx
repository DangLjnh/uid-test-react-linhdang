import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import CreateProduct from './pages/create-product/CreateProduct';
import AppLayout from './layouts/AppLayout';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;