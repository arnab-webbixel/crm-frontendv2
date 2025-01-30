import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Base API URL
const BASE_URL = 'https://crm.webbixel.com/clients/api/v1';

// Thunk to fetch remarks
export const fetchRemarks = createAsyncThunk(
  'remarks/fetchRemarks',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${clientId}/remarks`);
      if (!response.ok) {
        throw new Error('Failed to fetch remarks');
      }
      
      return await response.json(); // Parse the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a new remark
export const addRemark = createAsyncThunk(
  'remarks/addRemark',
  async ({ clientId, comment }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${clientId}/remarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add remark');
      }

      return await response.json(); // Return the added remark
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const remarksSlice = createSlice({
  name: 'remarks',
  initialState: {
    remarks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addRemarks: (state, action) => {
      // Add the new remark to the state
      state.remarks.push(action.payload);
    },
    setRemarks: (state, action) => {
      // Set remarks fetched from API
      state.remarks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchRemarks
      .addCase(fetchRemarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemarks.fulfilled, (state, action) => {
        state.loading = false;
        state.remarks = action.payload;
      })
      .addCase(fetchRemarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addRemark
      .addCase(addRemark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRemark.fulfilled, (state, action) => {
        state.loading = false;
        state.remarks.push(action.payload);
      })
      .addCase(addRemark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { addRemarks, setRemarks } = remarksSlice.actions;
export default remarksSlice.reducer;
