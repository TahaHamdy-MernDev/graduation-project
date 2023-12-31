import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const registerUserAction = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/register", userData);
    
      return response.data;
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const currentUserAction = createAsyncThunk(
  "auth/current-user",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/current-user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
