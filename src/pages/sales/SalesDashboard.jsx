import React from 'react'
import Dashboard from '@/components/SalesDashboard/Dashboard'

const generateDummyData = () => {
  const revenue = Math.floor(Math.random() * 10000000);
  const prevRevenue = Math.floor(Math.random() * 10000000);
  const deals = Math.floor(Math.random() * 200);
  const dealValue = Math.floor(Math.random() * 500000);
  const winRate = (Math.random() * 100).toFixed(1);
  const difference = revenue - prevRevenue;
  const differencePercentage = prevRevenue === 0 ? 0 : ((difference / prevRevenue) * 100).toFixed(1); // Handle division by zero
  const dateRange = "Jun 1 - Aug 31, 2023";

  const numPlatforms = 4; // Fixed number of platforms
  const platformData = [
      { name: 'Dribbble', revenue: 227459, percentage: 43 },
      { name: 'Instagram', revenue: 142823, percentage: 27 },
      { name: 'Behance', revenue: 89935, percentage: 11 },
      { name: 'Google', revenue: 37028, percentage: 7 },
  ];

  const numSalespeople = Math.floor(Math.random() * 5) + 3;
  const salesData = Array.from({ length: numSalespeople }, () => ({
      name: `Salesperson ${Math.random().toString(36).substring(7)}`,
      revenue: Math.floor(Math.random() * 1000000),
  }));

  return {
      revenue,
      prevRevenue,
      deals,
      dealValue,
      winRate,
      platformData,
      salesData,
      difference,
      differencePercentage,
      dateRange,
  };
};

const dummyData = generateDummyData();

const SalesDashboard = () => {
  return (
    <Dashboard {...dummyData}/>
  )
}

export default SalesDashboard