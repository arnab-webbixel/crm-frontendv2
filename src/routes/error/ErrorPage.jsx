import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();  // Hook to navigate between routes

  const handleNavigate = () => {
    navigate('/main');  // Navigates to the '/main' route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-center p-4">
      <div className="max-w-lg p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-4">404 Not Found</h3>
        <p className="text-[36px] text-gray-700 dark:text-gray-300 mb-4">Whoops!</p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Oh Friend, this is really awful... you are looking for something that is not there.
        </p>
        <button 
          onClick={handleNavigate} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
