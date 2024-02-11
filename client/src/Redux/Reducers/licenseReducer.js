import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const initialState = {
  fileName: "",
  error: null,
};

export const issueLicense = createAsyncThunk(
  "license/issueLicense",
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(`${BASE_URL}/license/${userId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const viewLicense = createAsyncThunk(
  "license/viewLicense",
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.get(`${BASE_URL}/license/licenseView/${userId}`, { headers });
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLicense = createAsyncThunk(
  "license/getLicense",
  async (payload, thunkAPI) => {
    try {
      const { userId, token } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.get(`${BASE_URL}/license/${userId}`, { headers });
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const licenseSlice = createSlice({
  name: "License",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(issueLicense.fulfilled, (state, action) => {
        state.fileName = action.payload.fileName;
        state.error = null;
      })
      .addCase(viewLicense.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(getLicense.fulfilled, (state, action) => {
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const licenseReducer = licenseSlice.reducer;
export const licenseActions = licenseSlice.actions;
export const licenseSelector = (state) => state.licenseReducer;
