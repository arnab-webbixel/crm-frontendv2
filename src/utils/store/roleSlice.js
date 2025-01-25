import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch roles and staff
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://46.202.163.75:3008/api/v1/staffs');
      if (response.data.success) {
        return response.data.data; // Staff data
      }
      return rejectWithValue('Failed to fetch roles and staff data.');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch roles.');
    }
  }
);

const initialState = {
  staff: [], // List of all staff
  currentRole: null, // The current role for conditional rendering
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRole(state, action) {
      state.currentRole = action.payload; // Set the current role
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload; // Store all staff
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
