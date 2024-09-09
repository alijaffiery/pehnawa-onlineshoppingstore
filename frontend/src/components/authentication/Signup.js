import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Crypto from 'crypto-js'

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        if (username.length < 3 || username.length > 20) {
            return "Username must be between 3 and 20 characters long.";
        }
        if (!/^[a-z0-9_]+$/.test(username)) {
            return "Username can only contain lowercase letters, numbers, and underscores.";
        }
        if (username.startsWith('_') || username.endsWith('_')) {
            return "Username must not start or end with an underscore.";
        }
        if (username.includes('__')) {
            return "Username must not contain consecutive underscores.";
        }
        return "";
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
        }
        return "";
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
    
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
    
        const emailValidationError = validateEmail(email) ? "" : "Invalid email format";
        const usernameValidationError = validateUsername(username);
        const passwordValidationError = validatePassword(password);
    
        if (emailValidationError || usernameValidationError || passwordValidationError) {
            setEmailError(emailValidationError);
            setUsernameError(usernameValidationError);
            setPasswordError(passwordValidationError);
            return;
        }
    
        const hashedPassword = Crypto.SHA256(password).toString();
    
        try {
            await axios.post('http://localhost:3001/signup', {
                username,
                email,
                password: hashedPassword,
            });
    
            toast.success('Signup successful!', {
                position: "top-right",
                autoClose: 5000,
            });
             setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error('Signup failed. Please try again.', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <ToastContainer />
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
                    <p className="text-center mb-6">Please sign up to continue.</p>

                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p>
                            Already have an account?
                            <a href="/login" className="text-green-500 hover:underline ml-1">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signup;
