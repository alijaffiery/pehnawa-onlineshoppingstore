import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import ShoppingCart from '../assets/shopping-bag.svg';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <div className="shadow-md w-full">
      <div className="md:px-10 py-4 px-7 flex justify-between items-center">
        <Link to="/" className="cursor-pointer">
          <img src={Logo} alt="logo" className="h-8" />
        </Link>
        <div className="flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-800 hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-gray-800 hover:text-gray-600">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/shopping-cart">
                <img src={ShoppingCart} alt="shopping-cart" className="h-6" />
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-gray-800 hover:text-gray-600">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
