import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
  <AuthProvider>
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </CartProvider>
  </AuthProvider>
</Router>
  );
}

export default App;
