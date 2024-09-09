import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import CategoryDetails from './components/CategoryDetails';
import CartPage from './components/CartPage';
import AuthService from './components/authentication/AuthService';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard addToCart={addToCart} />} />
        <Route path="/categories" element={<Categories addToCart={addToCart} />} />
        <Route path="/shopping-cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/category/:categoryTitle" element={<CategoryDetails addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
