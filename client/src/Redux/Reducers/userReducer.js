import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { user: null, error: null, token: null };

const BASE_URL = "http://localhost:8080";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/profileUpdate",
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.delete(`${BASE_URL}/user/delete/${userId}`, {
        headers,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/profileUpdate",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { userId, token, user } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(`${BASE_URL}/user/update/${userId}`, user, {
        headers,
      });
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    // .addCase(loginUser.rejected, (state, err) => {
    //   console.log(err);
    //   state.error = err.payload;
    // });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
    });
    // .addCase(registerUser.rejected, (state, err) => {
    //   state.error = err.payload;
    // });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    // .addCase(updateUser.rejected, (state, err) => {
    //   state.user = err.payload;
    // });

    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = action.payload;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// Selecting and exporting user slice state from the store
export const userSelector = (state) => state.userReducer;
