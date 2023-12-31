import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import {
  createCategoryAction,
  getAllCategoriesAction,
} from "../Action/categoryAction";
const bookSlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    categories: [],
    getCategory: null,
    loading: false,
    error: null,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Login User ----------------
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // state.currentUser = payload.data;
      })
      .addCase(getAllCategoriesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      
        state.categories = payload.data;
        // state.currentUser = payload.data;
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
  
          let error = payload.error;
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
        }
      );
  },
});
export default bookSlice.reducer;
