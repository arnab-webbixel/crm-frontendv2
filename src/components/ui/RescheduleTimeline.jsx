// import React from 'react';

// const RescheduleTimeline = ({ events }) => {
//   return (
//     <div className="bg-dark-800 text-[#103139] p-4 rounded-lg shadow-md w-[550px] ">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-bold">Reschedule</h3>
//         <button className="text-sm bg-dark-600 px-2 py-1 rounded flex items-center">
//           View all <span className="ml-1">&#9662;</span>
//         </button>
//       </div>
//       <div className="flex items-center justify-between">
//         {events.map((event, index) => (
//           <div key={index} className="text-center">
//             <p className="text-sm text-muted-foreground">{event.time}</p>
//             <div className="relative my-2">
//               <span
//                 className={`absolute w-2 h-2 rounded-full ${event.color}`} 
//                 style={{ left: '50%' }}
//               ></span>
//             </div>
//             <p className={`text-sm font-semibold ${event.active ? 'text-primary' : 'text-muted'}`}>
//               {event.name}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RescheduleTimeline;

import React from 'react';

const RescheduleTimeline = ({ events }) => {
  return (

<div className="bg-dark-800 text-[#103139] p-6 rounded-lg shadow-md w-[550px]">
  <div className="flex justify-between items-center mb-6">
    {/* Title */}
    <h3 className="text-lg font-bold ml-2">Reschedule</h3>

    {/* View All Button */}
    <button className="text-sm bg-dark-600 px-3 py-1 rounded flex items-center mr-2">
      View all <span className="ml-1">&#9662;</span>
    </button>
  </div>

  {/* Events Section */}
  <div className="flex justify-between items-center">
    {events.map((event, index) => (
      <div key={index} className="text-center flex flex-col items-center">
        {/* Time */}
        <p className="text-sm text-muted-foreground">{event.time}</p>

        {/* Dot Indicator */}
        <div className="relative my-2">
          <span
            className={`absolute w-2 h-2 rounded-full ${event.color}`}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          ></span>
        </div>

        {/* Name */}
        <p
          className={`text-sm font-semibold ${
            event.active ? 'text-primary' : 'text-muted'
          }`}
        >
          {event.name}
        </p>
      </div>
    ))}
  </div>
</div>
  )
}
export default RescheduleTimeline;
