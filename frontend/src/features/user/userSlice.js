import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URL from environment variables for flexibility
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/userAuth`;

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
      return res.data.user; // This becomes the action.payload on success
    } catch (err) {
      return thunkAPI.rejectWithValue("User not logged in or session expired.");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/signupForm`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data.user; // This becomes the action.payload on success
    } catch (err) {
      // Pass the specific error message from the server to the rejected action
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "An unknown error occurred during signup."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      return true; // Indicates success, payload isn't critical here
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true, // Start with loading:true to show a spinner while fetchUser runs on app load
    error: null,
  },
  reducers: {
    // A standard reducer for manually setting the user state if ever needed.
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  // Handles actions dispatched by createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Cases for fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      // Cases for signupUser
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear the user from state on successful logout
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
       
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;