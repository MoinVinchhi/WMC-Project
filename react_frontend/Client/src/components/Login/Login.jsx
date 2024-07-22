import React, { useState ,useContext, useEffect} from 'react';
import axios from 'axios';
import { AuthContext } from '../../creatContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../creatContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate =useNavigate();


  axios.defaults.withCredentials=true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.status === 200) {
        const { username, token, points, isAdmin, Login } = response.data;
        
        const newAuth = {
          username,
          token,
          isLoggedIn: true,
          isAdmin: isAdmin || false,
          points: points,
        };

        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));

        alert(isAdmin ? "Admin Login successful" : "Login successful");
        navigate('/');
      }
    } catch (error) {
      setError(error.response.data.error);
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
          <h1>Welcome, {auth.username? auth.username : 'Guest'}</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded"
          />

          {/* <hr className='relative bg-gray-300 h-[1px] w-full -top-2' /> */}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4"
          />
          
          {/* <hr className='relative bg-gray-300 h-[1px] w-full -top-2' /> */}

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4"
          >
            Log In
          </button>

          <h4 className='mt-4 text-center'> Don't have an account? <a href='\signup' className='text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all'>Sign Up</a> </h4>

        </form>
      </div>
    </div>
  );
}