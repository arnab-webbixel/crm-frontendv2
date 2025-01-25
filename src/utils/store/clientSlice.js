import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Thunk to fetch clients by userId
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://crm.webbixel.com/clients/api/v1/');
      console.log(response.data);
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients.');
    }
  }
);
// Thunk to add a new client
export const addClient = createAsyncThunk(
  'clients/addClient',
  async (newClient, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://crm.webbixel.com/clients/api/v1/', newClient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add client.');
    }
  }
);
// Thunk to update a client
export const updateClient = (id, updatedClient) => async (dispatch) => {
  dispatch(clientActions.setLoading(true));
  try {
    const response = await axios.put(`https://crm.webbixel.com/clients/api/v1/${id}`, updatedClient, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(clientActions.updateClient({ id, updatedClient: response.data.data }));
  } catch (error) {
    dispatch(clientActions.setError(error.response?.data?.message || 'Failed to update client.'));
  } finally {
    dispatch(clientActions.setLoading(false));
  }
};

// Thunk to delete a client
export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://crm.webbixel.com/clients/api/v1/${clientId}`);
      return clientId;  // Return the clientId to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete client.');
    }
  }
);

// Define the initial state
const initialState = {
  clients: [],
  loading: false,
  error: null,
};

// Create the slice
const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    resetState(state) {
      return initialState; // Reset to initial state
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addClient(state, action) {
      state.clients.push(action.payload);  // Add new client to the state
    },
    updateClient(state, action) {
      const { id, updatedClient } = action.payload;
      const index = state.clients.findIndex((client) => client._id === id);  // Find client by _id
      if (index !== -1) {
        state.clients[index] = { ...state.clients[index], ...updatedClient };
      }
    },
    deleteClient(state, action) {
      state.clients = state.clients.filter((client) => client._id !== action.payload);  
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all clients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure payload is an array
        if (Array.isArray(action.payload)) {
          state.clients = action.payload;  // Assign fetched clients to the state
        } else {
          console.warn('Expected an array but got:', action.payload);
          state.clients = [];  // Fallback to empty array
        }
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch clients.';  // Set error if fetch fails
      })

      // Add client
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);  // Add new client to the state
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add client.';  // Set error if adding client fails
      })

      // // Update client
      // .addCase(updateClient.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateClient.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const { id, updatedClient } = action.payload;
      //   const index = state.clients.findIndex((client) => client._id === id);
      //   if (index !== -1) {
      //     state.clients[index] = { ...state.clients[index], ...updatedClient };
      //   }
      // })
      // .addCase(updateClient.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || 'Failed to update client.';  // Set error if update fails
      // })

      // Delete client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter((client) => client._id !== action.payload);  // Remove client from state
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete client.';  // Set error if delete fails
      });
  },
});
// Export actions and reducer
export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
