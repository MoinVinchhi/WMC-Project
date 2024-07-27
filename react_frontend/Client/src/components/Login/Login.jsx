import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../creatContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://wmc-project-av5d.onrender.com/login', { email, password });
      if (response.status === 200) {
        const { username, token, points, isAdmin ,email} = response.data;
        
        const newAuth = {
          username,
          token,
          isLoggedIn: true,
          isAdmin: isAdmin || false,
          points: points,
          email,
        };

        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));

        
        toast.success(isAdmin ? "Admin Login successful" : "Login successful");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-[540px] flex justify-center items-center bg-gray-100">
      <div className="max-w-md h-fit w-full p-6 bg-white rounded shadow-md">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/47/Epsilon_Program_Logo.png"
            className="h-36 shadow-sm"
            alt="Logo"
          />
          <h2 className="text-5xl font-bold mt-2 mb-8 text-center">Log In</h2>
          <h1>Welcome, {auth.username ? auth.username : 'Guest'}</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4"
          >
            Log In
          </button>

          <h4 className='mt-4 text-center'>
            Don't have an account? <a href='\signup' className='text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all'>Sign Up</a>
          </h4>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
