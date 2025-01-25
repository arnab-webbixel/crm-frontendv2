import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';  


export default function DataGridDemo({ columns, rows }) {
  return (
    <Box sx={{ height: 300, width: '100%',  overflowX: 'auto' }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,  // Specify the toolbar to be used
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,  // Enable the quick filter in the toolbar
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#14758d',  // Change header background color
            color: '#0086a7',              // Change text color in the header
            fontWeight: 'bold',          // Optional: make the header text bold
          },
          // Styling the rows
          '& .MuiDataGrid-row': {
            backgroundColor: '#f5f5f5',  // Default row background color
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e0e0e0',  // Hover row color
          },
          // Styling for selected rows
          '& .Mui-selected': {
            backgroundColor: '#14758d !important', // Selected row color
            color: 'white',                       // Text color for selected row
          },
          // Custom row styling for even/odd rows
          '& .MuiDataGrid-cell': {
            backgroundColor: 'transparent', // Ensure transparency to let row color show
          },
        }}
      />
    </Box>
  );
}
