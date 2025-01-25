import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const PlanButton = ({ isPremium, onSalesClick }) => {
  return (
    <div className="flex items-center space-x-4">
      {isPremium ? (
        <span className="bg-transparent text-[#585ded] px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
          <FaRegStar className="text-[#ff8400]" />
          <span>Premium</span>
        </span>
      ) : (
        <button
          onClick={onSalesClick}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Sales
        </button>
      )}
    </div>
  );
};

export default PlanButton;
