import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { addRemark, fetchRemarks } from '../../utils/store/remarkSlice'; 
import { useDispatch } from 'react-redux';

const RemarksList = ({ remarks, clientId }) => {
  const [newRemark, setNewRemark] = useState('');
  const dispatch = useDispatch();
  
  const sortedRemarks = [...remarks].sort((a, b) => 
    new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; 
    return date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleRemarkChange = (event) => {
    setNewRemark(event.target.value); // Update state as user types
  };

  const handleAddRemark = () => {
    if (newRemark.trim()) {
      dispatch(addRemark({ clientId, comment: newRemark })).then(() => {
        const newRemarkObject = {
          comment: newRemark,
          date: new Date().toISOString(),
          _id: generateUniqueId(), 
        };
        setRemarks((prev) => [newRemarkObject, ...prev]); // Update remarks locally
        setNewRemark('');
      });
    }
  };
  

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="px-4 py-3 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Remarks</h2>
        </div>
      </div>

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
              <p className="text-gray-700 whitespace-pre-wrap">{remark.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No remarks available.</div>
        )}
      </div>

      {/* Add Remark Section */}
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
