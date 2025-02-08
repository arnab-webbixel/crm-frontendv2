import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { addRemark, fetchRemarks } from '../../utils/store/remarkSlice'; 
import { useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';


// const RemarksList = ({ remarks, clientId }) => {
//   const [remarksState, setRemarks] = useState(remarks || []);  
// const [newRemark, setNewRemark] = useState(''); 

//   const dispatch = useDispatch();
//   useEffect(() => {
//     setRemarks(remarks || []);
//   }, [remarks]);

//   const sortedRemarks = [...remarks].sort((a, b) => 
//     new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
//   );
  

//   const formatDate = (dateString) => {
//     const utcDate = moment.utc(dateString);
//     return utcDate.isValid() 
//       ? utcDate.tz('Asia/Kolkata').format('MMMM D, YYYY h:mm A')
//       : 'Invalid Date';
//   };
  

//   const handleRemarkChange = (event) => {
//     setNewRemark(event.target.value); // Update state as user types
//   };
  
  
//   const handleAddRemark = () => {
//     if (newRemark.trim()) {
//       // Generate temporary ID for optimistic update
//       const tempId = uuidv4();
      
//       // Create optimistic remark
//       const optimisticRemark = {
//         comment: newRemark,
//         date: new Date().toISOString(),
//         _id: tempId, // Use UUID instead of custom ID
//         isOptimistic: true // Flag for temporary state
//       };

//       // Optimistic update
//       setRemarks(prev => [optimisticRemark, ...prev]);
//       setNewRemark('');

//       // Dispatch action and handle server response
//       dispatch(addRemark({ clientId, comment: newRemark }))
//         .then((serverRemark) => {
//           // Replace temporary remark with server response
//           setRemarks(prev => [
//             serverRemark,
//             ...prev.filter(remark => remark._id !== tempId)
//           ]);
//         })
//         .catch(() => {
//           // Rollback if request fails
//           setRemarks(prev => prev.filter(remark => remark._id !== tempId));
//         });
//     }
//   };

//   return (
//     <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
//       <div className="px-4 py-3 bg-white border-b border-gray-200 rounded-t-lg">
//         <div className="flex items-center gap-2">
//           <MessageCircle className="w-5 h-5 text-blue-600" />
//           <h2 className="text-lg font-semibold text-gray-800">Remarks</h2>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-[500px] mx-auto">
//         {sortedRemarks.length > 0 ? (
//           sortedRemarks.map((remark) => (
//             <div
//               key={remark._id} // Use _id as the key
//               className="flex flex-col bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-800">Customer</span>
//                 <span className="text-sm text-gray-500">
//                   {formatDate(remark.date)} {/* Use the date field */}
//                 </span>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{remark.comment}</p>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500">No remarks available.</div>
//         )}
//       </div>

//       {/* Add Remark Section */}
//       <div className="flex flex-col bg-white rounded-lg shadow-sm p-4">
//         <textarea
//           className="p-2 border rounded-lg text-sm w-full max-w-[500px] mx-auto"
//           placeholder="Add a remark..."
//           value={newRemark}
//           onChange={handleRemarkChange}
//           rows={4}
//         />
//         <button
//           onClick={handleAddRemark}
//           className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//         >
//           Add Remark
//         </button>
//       </div>
//     </div>
//   );
// };

const RemarksList = ({ remarks = [], clientId }) => {
    const [remarksState, setRemarks] = useState(remarks || []);  

  const [newRemark, setNewRemark] = useState('');
  const dispatch = useDispatch();

  const handleRemarkChange = (event) => setNewRemark(event.target.value);

  const handleAddRemark = () => {
    if (newRemark.trim()) {
      const tempId = uuidv4();
      const optimisticRemark = {
        _id: tempId,
        comment: newRemark,
        date: new Date().toISOString(),
        isOptimistic: true,
      };
  
      // Optimistic update: Add the new remark temporarily
      setRemarks((prevRemarks) => [optimisticRemark, ...prevRemarks]);
  
      // Dispatch the action to add the remark on the server
      dispatch(addRemark({ clientId, comment: newRemark }))
        .then((serverResponse) => {
          console.log('Server Response:', serverResponse);
  
          // Update the state with the full remarks array returned from the server
          const updatedRemarks = serverResponse?.remarks || [];
          setRemarks(updatedRemarks); // Replace state with updated remarks
        })
        .catch((error) => {
          console.error('Error adding remark:', error);
  
          // Rollback: Remove the optimistic remark in case of an error
          setRemarks((prevRemarks) =>
            prevRemarks.filter((remark) => remark._id !== tempId)
          );
        });
  
      // Clear the input field
      setNewRemark('');
    }
  };
  
  

  const formatDate = (dateString) => {
    const utcDate = moment.utc(dateString);
    return utcDate.isValid()
      ? utcDate.tz('Asia/Kolkata').format('MMMM D, YYYY h:mm A')
      : 'Invalid Date';
  };

  const sortedRemarks = [...remarksState].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-[500px] mx-auto">
    {sortedRemarks.length > 0 ? (
      sortedRemarks.map((remark) => (
        <div
          key={remark._id} // Use _id as the key
          className="flex flex-col bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Customer</span>
            <span className="text-sm text-gray-500">
              {formatDate(remark.date)} {/* Use the date field */}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{remark.comment || 'No comment provided'}</p>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500">No remarks available.</div>
    )}
  
      <div className="flex flex-col bg-white rounded-lg shadow-sm p-4">
        <textarea
          className="p-2 border rounded-lg text-sm w-full max-w-[500px] mx-auto"
          placeholder="Add a remark..."
          value={newRemark}
          onChange={handleRemarkChange}
          rows={4}
        />
        <button
          onClick={handleAddRemark}
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Remark
        </button>
      </div>
    </div>
  );
};


export default RemarksList;
