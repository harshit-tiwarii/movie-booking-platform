// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/userAuth`;

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
    return res.data.user; 
  } catch (err) {
    return thunkAPI.rejectWithValue("User not logged in");
  }
});

// Logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true, 
    error: null,
  },
  
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
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