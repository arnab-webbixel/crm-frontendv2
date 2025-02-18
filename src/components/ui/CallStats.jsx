import React, { useEffect, useState } from 'react';
import { MoreVertical, TrendingUp } from 'lucide-react';

// Configuration for different call types
const categoryConfig = {
  'archive': {
    label: 'Archive',
    color: '#9ca3af', // Neutral gray for archive
  },
  'warm-call': {
    label: 'Warm Call',
    color: '#f59e0b', // Orange for warm calls
  },
  'hot-call': {
    label: 'Hot Call',
    color: '#ef4444', // Red for hot calls
  },
  'follow-up': {
    label: 'Follow Up',
    color: '#0ea5e9', // Blue for follow-ups
  },
};

const CallStats = () => {
  const [callData, setCallData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("clal data : ", totalCalls)

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 15;

  useEffect(() => {
    const fetchDailyCalls = async () => {
      try {
        const response = await fetch(
          'https://crm.webbixel.com/clients/api/v1/call-counts?period=daily'
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        if (data.success) {
          const processedData = data.data.map(item => ({
            ...item,
            ...(categoryConfig[item._id] || { label: 'Unknown', color: '#cccccc' }), // Default values
          }));

          console.log("Processed Data:", processedData); // Debugging
          setCallData(processedData);
          setTotalCalls(processedData.reduce((sum, item) => sum + item.count, 0));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyCalls();
  }, []);

  const calculateStrokeDashOffset = (value) => {
    return (1 - value / totalCalls) * circumference;
  };

  if (loading) return <div className="p-6 text-center">Loading daily calls...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg w-[320px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Daily Calls</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="relative flex justify-center my-8  ">
        <svg width="250" height="250" viewBox="0 0 250 250">
          <circle
            cx="125"
            cy="125"
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            transform="rotate(-90 125 125)"
          />

          {callData.map((item, index) => (
            <circle
              key={item._id}
              cx="125"
              cy="125"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={calculateStrokeDashOffset(item.count)}
              transform="rotate(-90 125 125)"
              className="transition-all duration-1000 ease-out"
              style={{ strokeLinecap: 'round' }}
            />
          ))}
          </svg>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
            <div className="text-4xl font-bold text-gray-700 dark:text-gray-100">
              {totalCalls} 
            </div>
            <div className="text-sm text-gray-950 dark:text-gray-400">Total Calls</div>
          </div>
        
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {callData.map(item => (
          
          <div key={item._id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {item.count} 
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <TrendingUp className="inline-block h-4 w-4 mr-1 text-green-500" />
        <span className="text-green-500 dark:text-green-400">Real-time</span> updates
      </div>
    </div>
  );
};

export default CallStats;