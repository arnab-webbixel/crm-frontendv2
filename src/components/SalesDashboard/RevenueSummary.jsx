import React from 'react';

const RevenueSummary = ({ revenue, prevRevenue, difference, differencePercentage, dateRange }) => {
  return (
    <div className="bg-white rounded-2xl  p-8 mb-7 border-black w-auto justify-between" > {/* Reduced padding */}
      <h2 className="text-lg font-medium text-gray-400 mb-2">New report</h2>{/* Reduced font size */}
      <div className="flex items-center  gap-3 w-full " >
        <div>
          <h3 className="text-xl font-medium text-gray-700 mr-2">Revenue</h3>{/* Reduced font size */}
          <div className="text-4xl font-bold text-gray-800 mr-4">${revenue.toLocaleString()}</div>{/* Reduced font size */}
          <div className="text-xs text-gray-500 mb-4">vs prev. ${prevRevenue.toLocaleString()} {dateRange}</div>{/* Reduced font size */}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`bg-red-500 text-white rounded-full px-2 py-1 text-[0.6rem] flex items-center ${differencePercentage > 0 ? 'bg-green-500' : 'bg-red-500'}`}> {/* Reduced font size */}
            {differencePercentage > 0 ? '⬈' : '⬊'} {Math.abs(differencePercentage).toFixed(1)}%
          </div>
          <div className="bg-red-500 text-white rounded-full px-2 py-1 text-[0.6rem] flex items-center"> {/* Reduced font size and padding */}
            ${Math.abs(difference).toLocaleString()} {/* Absolute value for difference */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RevenueSummary;