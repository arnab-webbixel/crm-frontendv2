import React from 'react'
import DataGridDemo from '../../components/ui/DataGridDemo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import AddDialog from '../../components/ui/AddDialog';
import { useSelector, useDispatch } from 'react-redux';
import {fetchClientsById, addClient, deleteClient} from "../../utils/store/clientSlice"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ManageClient = () => {
   const dispatch = useDispatch();
   const { clients, loading, error } = useSelector((state) => state.clients);

   const { user } = useSelector((state) => state.auth);

   React.useEffect(() => {

      dispatch(fetchClientsById(user.id));
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
    // updated_by: '',
    // updated_date: null,
    // staff_id: '',
    // role: '',
    userId: user.id,  // Automatically assign the logged-in user's ID
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
      userId: user.id,  // Reset userId when opening dialog
    });
  };
  const [editRow, setEditRow] = React.useState(null);  
  const gridRef = React.useRef(null);
  const handleScroll = () => {
    // Optional: Save the scroll position to state or context
    const scrollLeft = gridRef.current?.scrollLeft;
    console.log('Scroll Left:', scrollLeft);
  };
  const columns = React.useMemo( ()=>{
    return [
      {
        field: 'company_name',
        headerName: 'Company Name',
        width: 180,
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 180,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
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
        editable: true,
      },
      {
        field: 'service_type',
        headerName: 'Service Type',
        width: 150,
        editable: true,
      },
      {
        field: 'call_type',
        headerName: 'Call Type',
        width: 150,
        editable: true,
      },
      {
        field: 'remarks',
        headerName: 'Remarks',
        width: 150,
        editable: true,
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
    ]

    }, [])
    const rows = React.useMemo(() => {
      if (Array.isArray(clients) && clients.length > 0) {
        return clients.map((client) => {
          // Fallback to an empty string or other default if client._id is missing
          const clientId = client._id || client.phone || client.email || 'default_id';
          return {
            id: clientId,  // Ensure each row has a unique id
            company_name: client.company_name,
            phone: client.phone,
            email: client.email,
            address: client.address,
            industry_type: client.industry_type,
            service_type: client.service_type,
            schedule_date: client.schedule_date,
            call_type: client.call_type,
            remarks: Array.isArray(client.remarks)
                      ? client.remarks.map(remark => remark.comment).join(', ') 
                      : '',
            whatsapp: client.phone,
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
      await dispatch(addClient(newClient));  // Await the dispatch to add client
      handleAddClientClose();  // Close the dialog after successful client addition
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
        created_by: user.id,  // Automatically assign the logged-in user's ID
        assigned_by: user.id,  // If this refers to the user who is managing the client
        staff_id: '', 
        userId: user.id,  // Reset to the logged-in user ID
      });  // Reset form fields to their initial values
    } catch (error) {
      console.error('Error adding client:', error);
      // Optionally, you could show an error message or handle errors here
    }
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
    <div>
      
      <h1>ManageClient</h1>
      <div className="datagrid-container" ref={gridRef}
      onScroll={handleScroll} style={{ width: '100%', marginBottom: '20px', overflowX: '' }}>
      
            <DataGridDemo
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              checkboxSelection
              disableSelectionOnClick
              style={{ minWidth: 1000 }} // Make sure grid is wide enough
            />

      </div>
      {/* Add client  */}
       {/* Add Client Button */}
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
        type="client"  // Set type as 'client' to show client-related fields
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