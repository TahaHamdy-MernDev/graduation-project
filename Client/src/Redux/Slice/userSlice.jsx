import { toast } from "react-toastify";
import {
  currentUserAction,
  loginUserAction,
  registerUserAction,
} from "../Action/userAction";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    getUser: null,
    loading: false,
    error: null,
    success: true,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Current User ----------------
      .addCase(currentUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUserAction.fulfilled, (state, { payload }) => {
       
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
         state.currentUser = payload.data;
      })
      //  ------------------- Login User ----------------
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.currentUser = payload.data;
      })
      //  ------------------- Register User ----------------
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAction.fulfilled, (state, { payload }) => {
    
        state.loading = false;
        state.success = true;
      })

    .addMatcher((action) => action.type.endsWith("/rejected"), (state, { payload }) => {
   
      let error =payload.message
      state.loading = false;
      if (error) {
        if (Array.isArray(error)) {
          error.forEach((err) => toast.error(err.message));
        } else if (error.success === false && error.message) {
          state.error = error.message;
          state.success = error.success;
        } else {
          state.error = "An unknown error occurred";
        }
      } else {
        state.error = "Network error occurred";
      }
    });
  },
});
export default userSlice.reducer;
