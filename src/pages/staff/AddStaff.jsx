// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';

// const AddStaff = () => {
//   const [staffData,setStaffData]=useState({
//     staff_id: '',
//     staff_code: '',
//     staff_name: '',
//     phone: '',
//     email: '',
//     role: '',
//     user_id: '',
//     password: '',
//   });
//   const dispatch=useDispatch();
//   const {loading,error}=useSelector((state)=>state.staff)
//   return (
//     <div className='text-green-700 font-extrabold text-5xl'>AddStuff</div>
//   )
// }

// export default AddStaff

import { createStaff } from '@/utils/store/staffSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const AddStaff = () => {
  const [staffData, setStaffData] = useState({
    staff_id: '',
    staff_code: '',
    staff_name: '',
    phone: '',
    email: '',
    role: '',
    user_id: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.staff); // Access the staff state from Redux

  const handleChange = (e) => {
    setStaffData({
      ...staffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the createStaff action
    dispatch(createStaff(staffData))
      .unwrap()
      .then((response) => {
        alert('Staff created successfully!');
        console.log('Created staff:', response);
        setStaffData({
          staff_id: '',
          staff_code: '',
          staff_name: '',
          phone: '',
          email: '',
          role: '',
          user_id: '',
          password: '',
        });
      })
      .catch((err) => {
        alert('Failed to create staff: ' + err);
        console.error(err);
      });
  };

  return (
    <div className="create-staff">
      <h2>Create Staff</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Staff ID:</label>
          <input
            type="text"
            name="staff_id"
            value={staffData.staff_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Staff Code:</label>
          <input
            type="text"
            name="staff_code"
            value={staffData.staff_code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Staff Name:</label>
          <input
            type="text"
            name="staff_name"
            value={staffData.staff_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={staffData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={staffData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={staffData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={staffData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={staffData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Staff'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default AddStaff;

// import React, { useState } from 'react';
// import { Button, TextField, MenuItem, CircularProgress, Typography, Alert } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { createStaff } from '../../utils/store/staffSlice';

// const StaffForm = () => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.staff); // Access loading and error from Redux state
  
//   // Form state
//   const [newStaff, setNewStaff] = useState({
//     Name: '',
//     phone: '',
//     email: '',
//     role: ''
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createStaff(newStaff));

//   };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Add New Staff
//       </Typography>

//       {error && (
//         <Alert severity="error" style={{ marginBottom: '20px' }}>
//           {error}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           name="Name"
//           value={newStaff.staff_name}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           style={{ marginBottom: '10px' }}
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           value={newStaff.phone}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           style={{ marginBottom: '10px' }}
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={newStaff.email}
//           onChange={handleInputChange}
//           fullWidth
//           required
//           style={{ marginBottom: '10px' }}
//         />
//         <TextField
//           label="Role"
//           name="role"
//           value={newStaff.role}
//           onChange={handleInputChange}
//           select
//           fullWidth
//           required
//           style={{ marginBottom: '20px' }}
//         >
//           <MenuItem value="admin">Admin</MenuItem>
//           <MenuItem value="Developer">Developer</MenuItem>
//           <MenuItem value="salesperson">Salesperson</MenuItem>
//           <MenuItem value="caller">Telecaller</MenuItem>
//         </TextField>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Add Staff'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default StaffForm;

