import React from 'react';
import DataGridDemo from '../../components/ui/DataGridDemo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import AddDialog from '../../components/ui/AddDialog';
import { useDispatch, useSelector } from 'react-redux'
import { fetchStaffByUserId, createStaff, deleteStaff, updateStaff} from "../../utils/store/staffSlice"
const ManageStaff = () => {
    
    const dispatch = useDispatch();
    const { staffList, loading, error } = useSelector((state) => state.staff);
    const { user } = useSelector((state) => state.auth);
    
    
     React.useEffect(() =>{
      dispatch(fetchStaffByUserId(user.id));
    }, [dispatch]) 

  const [addStaffDialog, setAddStaffDialog] = React.useState(false);
  const [editStaffDialog, setEditStaffDialog] = React.useState(false); // For editing staff
  const [newStaff, setNewStaff] = React.useState({
  staff_id: '',  
  staff_name: '',  
  phone: '',
  email: '',
  role: '',
  password: '', 
  });

  const [editRow, setEditRow] = React.useState(null); // State to hold the row that needs editing

  const columns = [
    { field: 'staff_id', headerName: 'ID', width: 90 },
    { field: 'staff_name', headerName: 'Name', width: 150, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const role = params.value;
        console.log("role is",role);
        
        let backgroundColor = '';
        switch (role) {
          case 'salesperson':
            backgroundColor = '#f8d7da'; break;
          case 'Developer':
            backgroundColor = '#d1e7dd'; break;
          case 'HR':
            backgroundColor = '#cff4fc'; break;
          case 'caller':
            backgroundColor = '#fef3c7'; break;

          default:
            backgroundColor = '#f5f5f5';
        }
        return (
          <div style={{
            backgroundColor,
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '8px'
          }}>
            {role || 'N/A'}
          </div>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => {
        
        const handleUpdate = () => {
          // Set the row data to be edited and open the edit dialog
          setEditRow(params.row); // Pass the row data to be edited
          setEditStaffDialog(true); // Open the edit dialog
        };

        const handleDelete = (staffId) => {

          dispatch(deleteStaff(staffId))
          .then(() => {
             console.log(`Deleted staff with ID: ${staffId}`);
           })
          .catch((error) => {
             console.error('Error deleting staff:', error);
           });
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={handleUpdate}><EditIcon /></button>
            <button onClick={()=>handleDelete(params.row._id)}><DeleteIcon /></button>
          </div>
        );
      }
    },
  ];

  

  // Handle the staff dialog close
  const handleAddStaffClose = () => {
    setAddStaffDialog(false);
  };

  // Handle the staff save (add staff)
  const handleAddStaffSave = () => {
    const staffWithUserId = {
      ...newStaff,
      user_id: user.id,
      password: newStaff.role === 'salesperson' || newStaff.role === 'caller' ? newStaff.password : null 
    };
    dispatch(createStaff(staffWithUserId))
      .then(() => {
        handleAddStaffClose();  // Close the dialog after staff is created
      })
      .catch((error) => {
        console.error('Error creating staff:', error);
      });
  };

  // Handle changes in Add/Edit staff fields
  const handleAddStaffChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit changes (for updating staff)
  const handleEditStaffChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the save action for updating staff
  const handleSave = () => {
    if (editRow && editRow._id) {
      const { _id, ...updateData } = editRow;
      dispatch(updateStaff({ staffId: _id, updateData }))
        .then(() => {
          setEditStaffDialog(false);
        })
        .catch((error) => {
          console.error('Error updating staff:', error);
        });
    } else {
      console.error('No staff selected for update');
    }
  };
  const processedStaffList = staffList.map((staff) => ({
    ...staff,
    id: staff._id, // Use _id as id
    
  }));
  

  return (
    <div>
      <h1>Manage Staff</h1>
      <DataGridDemo columns={columns} rows={processedStaffList}/>

      
      {/* Add Staff Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddStaffDialog(true)}
        style={{ marginBottom: '20px' }}
      >
        Add Staff
      </Button>

      {/* Add Dialog for adding new staff */}
      <AddDialog
        open={addStaffDialog}
        onClose={handleAddStaffClose}
        onSave={handleAddStaffSave}
        data={newStaff}
        onChange={handleAddStaffChange}
        type="staff"  // Set type as 'staff' to show staff-related fields
      />

      {/* Edit Dialog for editing existing staff */}
      <AddDialog
        open={editStaffDialog}
        onClose={() => setEditStaffDialog(false)}
        onSave={handleSave}
        data={editRow}
        onChange={(e) => setEditRow((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
        type="staff"  // Set type as 'staff'
      />
    </div>
  );
};

export default ManageStaff;


