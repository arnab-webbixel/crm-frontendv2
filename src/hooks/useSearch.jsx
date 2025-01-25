import { useMemo } from 'react';

export function useSearch(data, searchTerm, columns) {
  const searchedData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      columns.some(
        (column) =>
          row[column.id]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, columns]);

  return { searchedData };
}
