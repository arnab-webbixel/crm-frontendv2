import React from 'react';

const PlatformItem = ({ name, revenue, percentage, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between mb-2 border-black"> {/* Added margin-bottom */}
      <div className="flex items-center">
        {imageUrl && (
   <img src={imageUrl} alt={name} className="w-8 h-8 rounded-full mr-3 object-cover" />

        )}
        <span className="text-base font-medium text-gray-800 mr-2">{name}</span>
      </div>
      <div className="flex items-center">
        <span className="text-base font-medium text-gray-800 mr-2">${revenue.toLocaleString()}</span>
        <span className="text-gray-500 bg-slate-400 text-base rounded-md">{percentage}%</span>
      </div>
    </div>
  );
};

const PlatformList = ({ platforms }) => {
    return(
        <div className='bg-white rounded-2xl shadow p-6 w-[30%] my-10'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className='bg-gray-100 rounded-lg py-1 px-3 text-gray-500 text-sm'>
                    Filters
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 6h9.75M10.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 6h9.75M10.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                </div>
            </div>
            {platforms.map((platform) => (
                <PlatformItem className="border-black" key={platform.name} {...platform} />
            ))}
        </div>
    )
}

export default PlatformList;