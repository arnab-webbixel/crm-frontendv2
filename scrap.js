// Async thunk for handling login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ credentials, userType }, { rejectWithValue }) => {
    try {
      // Validate the userType (staff/admin)
      if (!userType) {
        return rejectWithValue('User type (staff/admin) is required');
      }

      // Define the login endpoint based on the user type (staff or admin)
      const loginEndpoint =
        userType === 'staff'
          ? 'http://46.202.163.75:3008/api/v1/login' // Staff login endpoint
          : 'http://46.202.163.75:3002/api/v1/login'; // Admin/User login endpoint

      // Make the POST request with credentials
      const response = await axios.post(loginEndpoint, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response indicates success
      if (response.data.success) {
        // Extract token and staff/user data from the response
        const data = response.data.data;
        const token = data.token;
        const user = userType === 'staff' ? data.staff : data.user; // Use staff data for staff login, user data for admin/user login

        // Return the necessary data (token and user/staff details)
        return {
          token,
          user,
        };
      } else {
        // If the login was not successful, reject with a message
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Handle any error that occurred during the login request
      return rejectWithValue(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  }
);
