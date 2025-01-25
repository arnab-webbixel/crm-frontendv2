import React from 'react';
import TopCards from './TopCards';
import RevenueSummary from './RevenueSummary';
import Salesitem from './Salesitem';
import PlatformList from './PlatformList'; // Import the new component

const Dashboard = (props) => {
  const { revenue, prevRevenue, deals, dealValue, winRate, platformData, salesData,  difference, differencePercentage, dateRange } = props;

  const dummyImageUrls = [
    "https://images.unsplash.com/photo-1575990258610-c097305d2752?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMHByb2ZpbGV8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWFuJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1531427186169-0148301b2064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
]

const platformImageUrls = { // Object to store image URLs
    Dribbble: "https://images.unsplash.com/photo-1735299362091-33c94b71a758?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Instagram: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZWJvb2t8ZW58MHx8MHx8fDA%3D",
    Behance: "https://plus.unsplash.com/premium_vector-1682299421181-94767a4741d2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Google: "https://images.unsplash.com/photo-1663090859310-97a1af639a29?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };


  const platformsWithImages = platformData.map(platform => ({
    ...platform,
    imageUrl: platformImageUrls[platform.name] || null, // Add imageUrl prop
  }));



  return (
    <div className="bg-[#f5f5f5] min-h-screen flex font-sans">
      
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
       <div className='flex gap-1 items-center '>

        <RevenueSummary 
            revenue={revenue}
            prevRevenue={prevRevenue}
            difference={difference}
            differencePercentage={differencePercentage}
            dateRange={dateRange}
            className="mb-6  max-w-[auto] overflow-hidden truncate flex " // Add spacing below
        />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"> */}
    <TopCards />
    {/* </div> */}
    </div>

    <div className="flex bg-slate-400 h-12 justify-between rounded-md">
      <div className='flex overflow-hidden shadow-lg gap-3  rounded-3xl h-12 items-center ml-2'> 
  
    {salesData.map((sale, index) => (
        <Salesitem
            key={sale.name}
            name={sale.name}
            revenue={sale.revenue}
            percentage={Math.random() * 100}
            imageSrc={dummyImageUrls[index % dummyImageUrls.length]}
            className="h-1 max-h-5 bg-gray-200 rounded"
        />
    ))}
    </div>
    <div className='justify-end flex items-center '>  <button className='bg-black text-white  mr-2 rounded-full w-28 h-10 items-center'>Details</button> </div>
    
 
</div>
{/* 
<div className="flex gap-2 items-center">
</div> */}


        <PlatformList platforms={platformsWithImages}  
        className="flex"
        // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[2rem] mx-auto"
        /> 
        {/* PlatformList component */}

        
      </main>
    </div>
  );
};

export default Dashboard;