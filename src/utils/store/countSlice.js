import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching call statistics
export const fetchCallStatsById = createAsyncThunk(
  'count/fetchCallStats',  // Action type
  async (userId, { rejectWithValue }) => {
    try {
      // Fetch data from the API endpoint
      const response = await axios.get(`http://46.202.163.75:3009/api/v1/call-stats/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // return response.data.data[0].calls;
      const callsData = response.data.data[0].calls;
      return Array.isArray(callsData) ? callsData : [callsData];
      // return response.data.calls;
    } catch (error) {
      // Return error message if the request fails
      console.error('API Error:', error.response);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch call stats');
    }
  }
);

// Initial state for the count slice
const initialState = {
  callStats: [],  // Stores the fetched stats data
  loading: false,   // Indicates if the request is in progress
  error: null,      // Stores any error message
};

// Create the slice
const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    // Optionally, you could add actions to reset or clear the stats
    resetStats(state) {
      state.callStats = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When the request is pending (loading)
      .addCase(fetchCallStatsById.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous error
      })
      .addCase(fetchCallStatsById.fulfilled, (state, action) => {
        state.loading = false;
        state.callStats = action.payload;
        
      })
      // When the request fails (error)
      .addCase(fetchCallStatsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Store the error message
      });
  },
});

// Export actions to use in components
export const { resetStats } = countSlice.actions;

// Export the reducer to be used in the store
export default countSlice.reducer;
