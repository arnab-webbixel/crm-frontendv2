import React from 'react';

const SalesItem = ({ name, revenue, percentage, imageSrc }) => {
  return (
    <div className="bg-white rounded-3xl shadow p-4 flex items-center justify-between h-10 ">
      <div className="flex items-center">
        {imageSrc && ( // Conditionally render the image
          <img src={imageSrc} alt={name} className="w-8 h-8 rounded-full mr-3 object-cover" />
        )}
        <div className='flex flex-col'>
            <span className="text-lg font-medium text-gray-800">${revenue.toLocaleString()}</span>
            <span className='text-xs text-gray-500'>{name}</span>
        </div>

      </div>
      <div className="text-gray-500 text-base">{percentage.toFixed(2)}%</div>
    </div>
  );
};

export default SalesItem;