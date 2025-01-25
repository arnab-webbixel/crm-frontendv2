import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../../utils/store/logSlice';
import { toast } from 'sonner';
import { logo} from '../../assets'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Turnstile, { useTurnstile } from "react-turnstile";

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(""); 
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = async(e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
    try {
      const result = await dispatch(loginUser({ ...input, turnstileToken }));
      console.log(result);

      if (result.payload && result.payload.success) {
        toast.success('Login successful');
        const userId = result.payload.data.user.id;
        if(userId){
          await dispatch(fetchUserProfile(userId));
        }

        navigate('/main');

      } else {
        toast.error(result.payload.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('An error occurred while logging in');
    }
  };

  const handleTurnstileVerify = (token) => {
    setTurnstileToken(token);  // Store the token after Turnstile verification
  };
  return (
    <div className="bg-[#fefefe] dark:bg-[#0d1b1e] h-screen flex justify-center items-center">
    <div className="bg-white dark:bg-[#11252b] w-full max-w-md p-8 rounded-lg shadow-lg">
      <div className="flex items-start mb-6">
        <div className="flex items-start space-x-4">
          <img 
            src={logo} 
            alt="Webbixel Logo" 
            style={{ height: '40px', width: '150px' }}
          />
        </div>
      </div>
      <div className="text-left mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Log in as Admin</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Welcome to CRM+. Let’s login to your account
        </p>
      </div>
  
      <form onSubmit={loginHandler} >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="admin@webbixel.com"
            
className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e]
 text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
 focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
            value={input.email}
            onChange={changeHandler}
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
              value={input.password}
              onChange={changeHandler}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
  
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/forgot-password"
            className="text-[#14758d] dark:text-[#1a9fb3] hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mb-4">
            {/* Add the Turnstile widget here */}
            <Turnstile
              sitekey="0x4AAAAAAA4A2pRln0wTT0I8" // Replace with your actual sitekey
              onVerify={handleTurnstileVerify}  // Callback to get the token
            />
          </div>
  
        <button
          type="submit"
          className="w-full bg-[#14758d] dark:bg-[#1a9fb3] text-white py-2 px-4 rounded-md hover:bg-[#0d5a65] dark:hover:bg-[#14758d] transition duration-200"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Log in"}
        </button>
  
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don’t have any account?{" "}
            <Link to="/signup" className="text-[#14758d] dark:text-[#1a9fb3] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Login;
