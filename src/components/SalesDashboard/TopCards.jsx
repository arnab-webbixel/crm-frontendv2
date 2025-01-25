// TopCards.jsx
import React from 'react';

const TopCards = () => {
  const deals = 256;
  const value = 528000;
  const winRate = 44;
  const bestDealValue = 42300;
  const topSalesCount = 72;
  const topSalesPerson = "Mikasa";
  const bestDealPerson = "Rolf Inc.";

  return (
    <div className="flex space-x-4 mb-10 ">
      {/* Top Sales Card */}
      <div className="bg-white rounded-2xl shadow p-2 w-40 text-left">
        <div className="flex justify-between items-center">
        <div>
        <p className="text-gray-500 text-sm mb-2">Top Sales</p>
        <h3 className="text-2xl font-medium">{topSalesCount}</h3>
        <p className="text-gray-500 text-sm mt-2">{topSalesPerson} <span className="text-gray-400">&gt;</span></p>
        </div>
        </div>
      </div>

      {/* Best Deal Card */}
      <div className="bg-[#1F2937] rounded-2xl shadow p-6 w-40 text-left text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm mb-2">Best Deal</p>
            <h3 className="text-2xl font-medium">${bestDealValue.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm mt-2">{bestDealPerson} <span className="text-gray-500">&gt;</span></p>
          </div>
        </div>
      </div>

      {/* Deals Card */}
      <div className="bg-white rounded-2xl shadow p-6 w-22 text-center"> {/* Smaller width */}
        <p className="text-gray-500 text-sm mb-2">Deals</p>
        <h3 className="text-2xl font-medium">{deals}</h3>
        <p className="text-gray-500 text-sm mt-2"> ⬊ 5</p>
      </div>

      {/* Value Card */}
      <div className="bg-white rounded-2xl shadow p-6 w-22 text-center border-2 border-[#FF5370]"> {/* Smaller width */}
        <p className="text-gray-500 text-sm mb-2">Value</p>
        <h3 className="text-2xl font-medium">${(value / 1000).toFixed(0)}k</h3>
        <p className="text-gray-500 text-sm mt-2"> ⬈ 7.9%</p>
      </div>

      {/* Win Rate Card */}
      <div className="bg-white rounded-2xl shadow p-6 w-22 text-center"> {/* Smaller width */}
        <p className="text-gray-500 text-sm mb-2">Win Rate</p>
        <h3 className="text-2xl font-medium">{winRate}%</h3>
        <p className="text-gray-500 text-sm mt-2"> ⬈ 1.2%</p>
      </div>
    </div>
  );
};

export default TopCards;