import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegisterState } from '../../utils/store/logSlice'; // Updated import to use `authSlice`
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing password visibility icons
import { logo } from '../../assets';

const Signup = () => {
  const [input, setInput] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Access the auth state: loading, success, error, and userData from the `auth` slice
  const { loading, success, error, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (input.password !== input.confirmPassword) {
      toast.error('Password and Confirm Password must match');
      return;
    }

    // Dispatch the registerUser async action
    const result = await dispatch(registerUser({
      name: input.name,
      email: input.email,
      password: input.password,
    }));

    // Handle registration success/failure
    if (registerUser.fulfilled.match(result)) {
      toast.success('Registration successful');
      setInput({ name: '', email: '', password: '', confirmPassword: '' });
      dispatch(resetRegisterState()); // Reset register state after success
      navigate('/main/dashboard'); // Navigate to the dashboard after successful registration
    } else {
      toast.error(result.payload || 'Registration failed');
    }
  };

  return (
    <div className="bg-[#fefefe] dark:bg-[#0d1b1e] h-screen flex justify-center items-center">
      <div className="bg-white dark:bg-[#11252b] w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex items-start mb-6">
          <img src={logo} alt="Webbixel Logo" style={{ height: '40px', width: '150px' }} />
        </div>
        <div className="text-left mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create an Account</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Welcome to CRM+. Please create your account
          </p>
        </div>

        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
              value={input.name}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
                value={input.password}
                onChange={changeHandler}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
                value={input.confirmPassword}
                onChange={changeHandler}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#14758d] dark:bg-[#1a9fb3] text-white py-2 px-4 rounded-md ${
              loading ? 'cursor-not-allowed' : 'hover:bg-[#0d5a65] dark:hover:bg-[#14758d]'
            } transition duration-200`}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">User registered successfully!</p>}

          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#14758d] dark:text-[#1a9fb3] hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
