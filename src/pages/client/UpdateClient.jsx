import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../utils/store/clientSlice'; 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);
import {fetchRemarks} from '../../utils/store/remarkSlice';
import RemarksList from '../remarks/RemarkList';
const UpdateClient = () => {
  const dispatch = useDispatch();
  const [selectedClientId, setSelectedClientId] = useState(null); 
  const [remarksVisible, setRemarksVisible] = useState(false); 
  const remarksRef = useRef(null);
  


  const { clients, loading, error } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);


  useEffect(() => {
    if (selectedClientId) {
      dispatch(fetchRemarks(selectedClientId));
    }
  }, [selectedClientId, dispatch]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (remarksRef.current && !remarksRef.current.contains(event.target)) {
        setRemarksVisible(false); // Close the remarks panel
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const {remarks} = useSelector((state)=>state.remarks);
  console.log(JSON.stringify(remarks) + 'My remarks');
  // Column Definitions
  const [colDefs] = useState([
    { field: 'name', headerName: 'Name',  cellStyle: { backgroundColor: '#f0f0f0', fontWeight: 'bold' }, },
    { field: 'email', 
      headerName: 'Email' ,
      cellStyle: (params) => {
        if (params.value === 'NA') {
          return { color: 'red', fontStyle: 'italic' }; 
        }
        return null;
      },
    
    
    },
    { field: 'phone', headerName: 'Phone',  headerClass: 'header-bold', },
    { field: 'company_name', headerName: 'Company Name', }, 
    { field: 'address', headerName: 'Address' },
    { field: 'industry_type', headerName: 'Industry Type' },
    { field: 'service_type', headerName: 'Service Type' },
    { 
      field: 'remarks', 
      headerName: 'Remarks',
      valueGetter: (params) => {

        if (!params.data.remarks || params.data.remarks.length === 0) {
          return 'No remarks';
        }
        const remarks = Array.isArray(params.data.remarks)
          ? params.data.remarks.map((remark) => remark.comment).join(', ')
          : '';
        return remarks;
      }
    },
    { field: 'call_type', headerName: 'Call Type' },
    {
      field: 'schedule_date',
      headerName: 'Schedule Date',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: 'status', headerName: 'Status' },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: (params) => (
        <div>
          <button 
            style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
            onClick={() => handleEdit(params.data._id)}
          >
            Edit
          </button>
          <button 
            style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', marginLeft: '5px' }}
            onClick={() => handleDelete(params.data._id)}
          >
            Delete
          </button>
        </div>
      ),
      width: 200,
    },
  ]);

  const onRowClicked = (params) => {
    setSelectedClientId(params.data._id);
    setRemarksVisible(true); // Show remarks when a client is selected
  };

  // Handle loading and error states
  if (loading) return <div>Loading clients...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div> 
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={clients}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        onRowClicked={onRowClicked} 
      />
    </div>
    {remarksVisible && selectedClientId && (
      
      <div ref={remarksRef}>
      <RemarksList remarks={remarks} clientId={selectedClientId} />
    </div>
      )}
    </div>
  );
};

export default UpdateClient;