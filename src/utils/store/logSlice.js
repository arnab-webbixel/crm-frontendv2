import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for handling user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://crm.webbixel.com/auth/api/v1/user', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register user');
    }
  }
);



// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId, { getState, rejectWithValue }) => {
    try {
      // Get the token from the Redux store to send in headers
      const token = getState().auth.token;
      // console.log(token + "tokens sent");
      
      const response = await axios.get(`https://crm.webbixel.com/auth/api/v1/user/profile/${userId}`);
      // console.log(response.data + " response in thunk");
      // console.log("Response data in thunk:", JSON.stringify(response.data, null, 2));

      return response?.data; // Return the profile data
    } catch (error) {
      console.error(error + ": error");
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile.');
    }
  }
);



// Async thunk for handling login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // const logUrl = process.env.REACT_APP_LOG_URL;
      // Replace with your backend API endpoint
      const response = await axios.post('https://crm.webbixel.com/auth/api/v1/login',credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Return response data: user info and token
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      // Return the error message from the server, or default message
      return rejectWithValue(error.response?.data?.message || 'Failed to login. Please try again.');

    }
  }
);

// Initial state for authentication slice
const initialState = {
  user: null, // Will store user information upon successful login
  token: localStorage.getItem('token') || null, // Persist token in localStorage
  profile: null,
  loading: false,
  error: null,
  success: false,
  userData: null, // Stores user data for registration
};


// Create the slice
const logSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset the registration state
    resetRegisterState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = null;
    },
    // Handle user logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.profile = null; 
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registration actions
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userData = action.payload.data; // Store the registered user data
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload; // Store the error message
    })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user; // Store user data in state
        state.token = action.payload.data.token; // Store token in state
        localStorage.setItem('token', action.payload.data.token); // Save token for future use
        // Fetch profile right after login is successful
        const userId = action.payload.data.user.id;
        if (userId) {
          // Trigger the fetchUserProfile thunk
          state.loading = true;  // Set loading before profile is fetched
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use the error message from `rejectWithValue`
      })
     // Handle profile fetch
     .addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.data.profile;
      
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
      
  },
});

export const { logout , resetRegisterState} = logSlice.actions; // Export logout action
export default logSlice.reducer; // Export reducer
