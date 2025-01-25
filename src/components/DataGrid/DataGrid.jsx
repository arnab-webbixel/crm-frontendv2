import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, Settings2 } from 'lucide-react';
import { ColumnSelector } from '../ui/ColumnSelector';
import { Pagination } from '../ui/Pagination';
import { useSort } from '../../hooks/useSort';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';

export function DataGrid({ data, columns: initialColumns, itemsPerPage = 10 }) {
  const [columns, setColumns] = useState(initialColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const { sortedData, sortConfig, requestSort } = useSort(data);
  const { searchedData } = useSearch(sortedData, searchTerm, columns);
  const {
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  } = usePagination(searchedData, itemsPerPage);

  const toggleColumn = (columnId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns = columns.filter((col) => col.visible);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowColumnSelector(!showColumnSelector)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Settings2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {showColumnSelector && (
        <ColumnSelector
          columns={columns}
          toggleColumn={toggleColumn}
          onClose={() => setShowColumnSelector(false)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => requestSort(column.id)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortConfig?.key === column.id &&
                      (sortConfig.direction === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {visibleColumns.map((column) => (
                  <td key={column.id} className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                    {column.render ? column.render(row) : String(row[column.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
