import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";
import { addCommentBookAction, createBookAction, deleteBookAction, getAllBookAction, updateBookAction } from "../Action/bookAction";
const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: null,
    books: [],
    getBok: null,
    loading: false,
    error: null,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Create Book ----------------
      .addCase(createBookAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Get All Books  ----------------
      .addCase(getAllBookAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.books = payload.data;
      })
      //  ------------------- Update Book  ----------------
      .addCase(updateBookAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Delete Book  ----------------
      .addCase(deleteBookAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Delete Book  ----------------
      .addCase(addCommentBookAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommentBookAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      // //  ------------------- Rate Book  ----------------
      // .addCase(downloadBookAction.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(downloadBookAction.fulfilled, (state, { payload }) => {
      //   state.loading = false;
      //   state.success = true;
      // })

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
