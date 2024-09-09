import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from './AuthService';
import Crypto from 'crypto-js'

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const hashedPassword = Crypto.SHA256(password).toString();

    try {
      const token = await AuthService.login(username, hashedPassword);
      if (token) {
        onLogin();
        navigate('/');
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        throw new Error('Token is not available');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed: ' + error.message, {
        position: 'top-right',
        autoClose: 5000,
      });
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"></div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-center mb-6">Please sign in to continue.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-green-500 hover:underline">Forgot Password?</a>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?
            <a href="/signup" className="text-green-500 hover:underline ml-1">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
