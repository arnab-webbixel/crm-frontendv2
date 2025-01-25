import React from 'react'
import DataGridDemo from '../../components/ui/DataGridDemo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import AddDialog from '../../components/ui/AddDialog';
import { useSelector, useDispatch } from 'react-redux';
import {fetchClients, addClient, deleteClient} from "../../utils/store/clientSlice"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const ManageClient = () => {
   const dispatch = useDispatch();
   const { clients, loading, error } = useSelector((state) => state.clients);

   const { user } = useSelector((state) => state.auth);

   React.useEffect(() => {

      dispatch(fetchClients());
   }, [dispatch, user.id]);  

  const [addClientDialog, setAddClientDialog] = React.useState(false);
  const [editClientDialog, setEditClientDialog] = React.useState(false);
  const [newClient, setNewClient] = React.useState({
    company_name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    website: '',
    industry_type: '',
    service_type: '',
    call_type: '',
    remarks: '',
    schedule_date: '',
    created_by: '',  
  });

  const handleAddClientDialogOpen = () => {
    setAddClientDialog(true);
    setNewClient({
      company_name: '',
      phone: '',
      email: '',
      address: '',
      landmark: '',
      website: '',
      industry_type: '',
      service_type: '',
      call_type: '',
      remarks: '',
      schedule_date: '',
      // userId: user.id,  
    });
  };
  const [editRow, setEditRow] = React.useState(null);  
  const gridRef = React.useRef(null);
  const handleScroll = () => {
    // Optional: Save the scroll position to state or context
    const scrollLeft = gridRef.current?.scrollLeft;
    console.log('Scroll Left:', scrollLeft);
  };
  const columns = React.useMemo(() => [
    {
      field: 'name',
      headerName: 'name',
      width: 120,
      editable: false,
    },
    {
      field: 'company_name',
      headerName: 'Company Name',
      width: 180,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 180,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      editable: true,
    },
    {
      field: 'industry_type',
      headerName: 'Industry Type',
      width: 150,
      editable: false,
    },
    {
      field: 'service_type',
      headerName: 'Service Type',
      width: 150,
      editable: false,
    },
    {
      field: 'call_type',
      headerName: 'Call Type',
      width: 150,
      editable: false,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 180,
      renderCell: (params) => (
        <span>{params.value || 'No remarks'}</span>  // Display remarks or a default value
      ),
    },
    {
      field: 'whatsapp',
      headerName: 'WhatsApp',
      width: 150,
      renderCell: (params) => (
        <a
          href={`https://wa.me/+91${params.row.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <WhatsAppIcon style={{ color: 'green', cursor: 'pointer' }} />
        </a>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button onClick={() => handleUpdate(params.row)}><EditIcon /></button>
          <button onClick={() => handleDelete(params.id)}><DeleteIcon /></button>
        </div>
      ),
    },
  ], []);
    const rows = React.useMemo(() => {
      if (Array.isArray(clients) && clients.length > 0) {
        return clients.map((client) => {
          // Ensure client._id exists to serve as the unique identifier for the row
          const clientId = client._id || client.phone || client.email || 'default_id';
          
          // Convert the remarks array into a string of comments (if remarks exist)
          const remarks = Array.isArray(client.remarks)
            ? client.remarks.map((remark) => remark.comment).join(', ') 
            : '';
    
          return {
            id: clientId,  // Unique identifier for each row
            name: client.name,  
            company_name: client.company_name,
            phone: client.phone,
            email: client.email,
            address: client.address,
            industry_type: client.industry_type,
            service_type: client.service_type,
            call_type: client.call_type,
            schedule_date: client.schedule_date,
            remarks: remarks,  // Concatenated remarks
            whatsapp: client.phone,  // For WhatsApp link
          };
        });
      }
      return []; // Return an empty array if clients is empty or not an array
    }, [clients]);
    
    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this client?')) {
        dispatch(deleteClient(id));
      }
    };
  


   // Handle Add Client Dialog Close
   const handleAddClientClose = () => {
    setAddClientDialog(false);
  };

  // Handle Add Client Save (Add client to database or state)
  const handleAddClientSave = async() => {
    if (!newClient.company_name || !newClient.phone || !newClient.email) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const clientPayload = {
        name: newClient.name.trim(), // Trim any leading or trailing spaces
        company_name: newClient.company_name,
        phone: newClient.phone,
        email: newClient.email,
        address: newClient.address,
        landmark: newClient.landmark || '', // Optional field
        website: newClient.website || '', // Optional field
        industry_type: newClient.industry_type || '', // Optional field
        service_type: newClient.service_type || '', // Optional field
        call_type: newClient.call_type || '', // Optional field
        remarks: newClient.remarks ? [{ comment: newClient.remarks }] : [], // Handle remarks array
        schedule_date: newClient.schedule_date || null, // Allow null for optional fields
        status: 'Pending', // Assuming 'Pending' is a default status
        // customer_id: newClient.customer_id || null, // Assuming you might 
      };
  
      // Dispatch the action to add the client to the store
      // await dispatch(addClient(clientPayload));
      const response = await dispatch(addClient(clientPayload));
      console.log(response);
  
      // Close the Add Client dialog
      handleAddClientClose();
  
      // Reset the newClient state after adding
      setNewClient({
        name:'',
        company_name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        website: '',
        industry_type: '',
        service_type: '',
        call_type: '',
        remarks: '',
        schedule_date: '',
        // userId: user.id,
      });
  
      // Optional: Trigger fetchClients if you want to immediately update the grid after adding a client
      dispatch(fetchClients());
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Failed to add client. Please try again.');

    }
  };

  const handleUpdate = (client) => {
    setEditRow(client);  
    setEditClientDialog(true);  
  };

  // Handle changes in Add/Edit Client fields
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in Edit Client fields
  const handleEditClientChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save action for updating client
  const handleSave = () => {
    // console.log('Saved edited row:', editRow);
    // Here, update the rows array or send data to API
    console.log('Save button clicked');
    setEditClientDialog(false);  // Close the edit dialog
  };

  return (
    <div className='h-[90vh]'>
      
      <h1>ManageClient</h1>
      <div className="datagrid-container" ref={gridRef}
      onScroll={handleScroll} style={{ width: '100%', marginBottom: '20px', overflowX: '',}}>
      
            <DataGridDemo
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              checkboxSelection
              disableSelectionOnClick
              style={{ minWidth: 1000 }} 
            />

      </div>
       <Button
        variant="contained"
        color="primary"
        onClick={ handleAddClientDialogOpen}
        style={{ marginBottom: '20px' }}
      >
        Add Client
      </Button>
       {/* Add Client Dialog */} 
       <AddDialog
        open={addClientDialog}
        onClose={handleAddClientClose}
        onSave={handleAddClientSave}
        data={newClient}
        onChange={handleClientChange}
        type="client"  
      />

      <AddDialog
        open={editClientDialog}
        onClose={() => setEditClientDialog(false)}
        onSave={handleSave}
        data={editRow}
        onChange={(e) => setEditRow((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        type="client"  
      />

    </div>
  )
}

export default ManageClient