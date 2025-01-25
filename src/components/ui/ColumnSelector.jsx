import React from 'react';

export function ColumnSelector({ columns, toggleColumn, onClose }) {
  return (
    <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Show/Hide Columns</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>
      <div className="space-y-2">
        {columns.map((column) => (
          <label key={column.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={column.visible}
              onChange={() => toggleColumn(column.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{column.header}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
