import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStaffByUserId = createAsyncThunk(
  'staff/fetchStaffByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      
      const response = await axios.get(`https://crm.webbixel.com/emp/api/v1/staffs/user/${userId}`);
      if (response.data.success) {
        console.log('Fetched staff data:', response.data.data);
        return response.data.data; 
      }
      return rejectWithValue('Failed to fetch staff data.');
    } catch (error) {
      // Return the error message from the server or a default message
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff data.');
    }
  }
);


export const createStaff=createAsyncThunk(
  'staff/createStaff',
  async (newStaffData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://crm.webbixel.com/emp/api/v1/staffs-or', newStaffData);
      if (response.data.success) {
        console.log('Created staff:', response.data.data); // Debug log
        return response.data.data;
      }
      return rejectWithValue('Failed to create staff.');
    } catch (error) {
      // Return the error message from the server or a default message
      console.error(error);
      return rejectWithValue(error.response?.data?.message || 'Failed to create staff.');
    }
  }
)

// for delete stafs 
export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (staffId, { rejectWithValue }) => {
    try {
      // Send a DELETE request to the server with the staff ID
      const response = await axios.delete(`https://crm.webbixel.com/emp/api/v1/staff/${staffId}`);
      if (response.data.success) {
        console.log('Deleted staff:', response.data.staff);
        return response.data.staff; 
      }
      return rejectWithValue('Failed to delete staff.');
    } catch (error) {
      // Handle errors and return the error message
      return rejectWithValue(error.response?.data?.message || 'Failed to delete staff.');
    }
  }
);
  
export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async ({ staffId, updateData }, { rejectWithValue }) => {
    try {
      // Send PUT request to update staff
      const response = await axios.put(`https://crm.webbixel.com/emp/api/v1/staff/${staffId}`, updateData);
      if (response.data.success) {
        console.log('Updated staff:', response.data.staff);
        return response.data.staff; // Return the updated staff
      }
      return rejectWithValue('Failed to update staff.');
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response?.data?.message || 'Failed to update staff.');
    }
  }
);

// Initial state for the staff slice
const initialState = {
  staffList: [], // List of staff associated with the user
  loading: false,
  error: null,
};

// Create the slice
const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createStaff.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(createStaff.fulfilled,(state,action)=>{
      state.loading=false;
      state.staffList.push(action.payload) // Add new staff to the list
      console.log("new staff",action.payload);
    })
    .addCase(createStaff.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload || "Failed to create staff"
    })
    .addCase(fetchStaffByUserId.pending, (state) => {
      state.loading = true;   // Set loading to true while waiting for response
      state.error = null;     // Clear any previous errors
    })
    // Fulfilled case - When the API request is successful
    .addCase(fetchStaffByUserId.fulfilled, (state, action) => {
      state.loading = false;     // Set loading to false once the response is received
      state.staffList = action.payload; 
    })
    // Rejected case - When the API request fails
    .addCase(fetchStaffByUserId.rejected, (state, action) => {
      state.loading = false;    // Set loading to false once the request completes
      state.error = action.payload || 'Failed to fetch staff data.'; // Capture the error message
    })
    // For delete staff
    .addCase(deleteStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.staffList = state.staffList.filter(staff => staff._id !== action.payload._id);
    })
    .addCase(deleteStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete staff';
    })
    .addCase(updateStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateStaff.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.staffList.findIndex(staff => staff._id === action.payload._id);
      if (index !== -1) {
      state.staffList[index] = action.payload; // Replace the updated staff with the new data
      }


    })
    .addCase(updateStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update staff';
    });



  
}
});

export default staffSlice.reducer; // Export the reducer
