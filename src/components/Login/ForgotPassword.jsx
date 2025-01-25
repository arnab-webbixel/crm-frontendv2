import React from 'react'
const handleSendLink = () => {
  alert("Link has been sent!");
};
const ForgotPassword = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-[#0D1B1E]">
      <div className="bg-white dark:bg-[#11252B] p-6 rounded-lg shadow-lg w-80 text-center">
        <h1 className="text-sm font-semibold text-[#0D5A65] dark:text-white mb-4">
          Enter Your Email
        </h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-[#0D5A65] dark:focus:ring-[#1AB3C7] 
            bg-white dark:bg-[#0D1B1E] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={handleSendLink}
          className="w-full bg-[#0D5A65] dark:bg-[#1AB3C7] text-white py-2 rounded-md 
            hover:bg-[#094850] dark:hover:bg-[#1395A8] transition duration-300"
        >
          Send Link
        </button>
      </div>
    </div>
      );
}

export default ForgotPassword