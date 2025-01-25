import React from 'react';
import { X } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const DayView = ({ date, onClose }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{formatDate(date)}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[100px_1fr] gap-4">
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                <div className="text-right text-sm text-gray-500 pr-4 pt-2">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div className="border-t min-h-[60px] relative group">
                  <div className="absolute inset-x-0 -top-px opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full h-[60px] bg-blue-50 border border-blue-200 rounded opacity-50">
                      Click to add event
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
