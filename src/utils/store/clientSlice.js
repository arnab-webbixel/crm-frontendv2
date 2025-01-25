import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Thunk to fetch clients by userId
export const fetchClientsById = createAsyncThunk(
  'clients/fetchClientsById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://46.202.163.75:3009/api/v1/client/${userId}`); 
      return response.data.data;  
    } catch (error) {
      // Return a specific error message if API call fails
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients.');
    }
  }
);

// Thunk to add a new client
export const addClient = createAsyncThunk(
  'clients/addClient',  // Action type string
  async (newClient, { rejectWithValue, getState }) => {
    const { user } = getState().auth; // Retrieve user from state

    // Check if user has the correct permissions
    if (newClient.userId !== user.id) {
      return rejectWithValue('Unauthorized: You can only add clients for your account.');
    }

    try {
      const response = await axios.post('http://46.202.163.75:3009/api/v1/client', newClient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;  // Return the newly added client on success
    } catch (error) {
      console.error('Error details:', error); 
      return rejectWithValue(error.response?.data?.message || 'Failed to add client.');  // Handle errors
    }
  }
);
// Thunk to update a client
export const updateClient = (id, updatedClient) => async (dispatch) => {
  dispatch(clientActions.setLoading(true));
  try {
    const response = await axios.put(`http://46.202.163.75:3009/api/v1/client/${id}`, updatedClient, {
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
export const deleteClient = (id) => async (dispatch) => {
  dispatch(clientActions.setLoading(true));
  try {
    await axios.delete(`http://46.202.163.75:3009/api/v1/client/${id}`);
    dispatch(clientActions.deleteClient(id));
  } catch (error) {
    dispatch(clientActions.setError(error.response?.data?.message || 'Failed to delete client.'));
  } finally {
    dispatch(clientActions.setLoading(false));
  }
};

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
    // setClients(state, action) {
    //   state.clients = action.payload;
    //   state.error = null;
    // },
    addClient(state, action) {
      state.clients.push(action.payload);  // Add new client to the state
    },
    updateClient(state, action) {
      const { id, updatedClient } = action.payload;
      const index = state.clients.findIndex((client) => client._id === id);  // Use _id instead of id
      if (index !== -1) {
        state.clients[index] = { ...state.clients[index], ...updatedClient };
      }
    },
    deleteClient(state, action) {
      state.clients = state.clients.filter((client) => client._id !== action.payload);  // Use _id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsById.fulfilled, (state, action) => {
        state.loading = false;
      if (Array.isArray(action.payload)) {
         state.clients = action.payload;  // If it's already an array, assign it directly
       } else {
        console.warn('Expected an array but got:', action.payload);
        state.clients = [action.payload];  // Wrap it in an array if it's not an array
       }
      })
      .addCase(fetchClientsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Save error message if fetch fails
      })
      // add client
      .addCase(addClient.pending, (state) => {
        console.log('addClient pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        console.log('addClient fulfilled:', action.payload);
        state.loading = false;
        state.clients.push(action.payload);  // Add new client to the clients array
      })
      .addCase(addClient.rejected, (state, action) => {
        console.log('addClient rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;  // Set the error message
      });



  },
});

// Export actions and reducer
export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
