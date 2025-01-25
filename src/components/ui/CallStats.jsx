import React from 'react';
import { MoreVertical } from 'lucide-react';

const CallStats = ({ total, delivered, received, cancelled, trend, date }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 15;
  
  const calculateStrokeDashOffset = (value, total) => {
    return (1 - value / total) * circumference;
  };

  return (
    <div className="bg-white dark:bg-gray-800  rounded-3xl p-6 shadow-lg w-[320px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Today's Call</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total calls as of {date}</p>
        </div>
        <button className="p-1 hover:bg-gray-100  dark:hover:bg-gray-700 rounded-full">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="relative flex justify-center my-8">
        {/* SVG Chart */}
        <svg width="250" height="250" viewBox="0 0 250 250">
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset="0"
            transform="rotate(-90 125 125)"
          />
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={calculateStrokeDashOffset(delivered, total)}
            transform="rotate(-90 125 125)"
            className="transition-all duration-1000 ease-out"
          />
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#06b6d4"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={calculateStrokeDashOffset(received, total)}
            transform="rotate(-90 125 125)"
            className="transition-all duration-1000 ease-out"
          />
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={calculateStrokeDashOffset(cancelled, total)}
            transform="rotate(-90 125 125)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-100">{total}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9] dark:bg-[#0ea5e9]"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#06b6d4] dark:bg-[#06b6d4]"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Received</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#fbbf24] dark:bg-[#fbbf24]"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
        </div>
      </div>

      {/* Trend */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Trending up by <span className="text-green-500 dark:text-green-400">{trend}%</span> this month
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">
        Showing total calls of last 24 hours
      </div>
    </div>
  );
};

export default CallStats;
