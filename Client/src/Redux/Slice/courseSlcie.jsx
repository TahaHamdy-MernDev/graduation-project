import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";
import { createCourseAction, deleteCourseByIdAction, fetchCoursesAction, updateCourseByIdAction } from "../Action/courseAction";
const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
    courses: [],
    getCourses: null,
    loading: false,
    error: null,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Create Course ----------------
      .addCase(createCourseAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Get All Courses  ----------------
      .addCase(fetchCoursesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.courses = payload.data;
      })
      //  ------------------- Update Book  ----------------
      .addCase(updateCourseByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseByIdAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Delete Book  ----------------
      .addCase(deleteCourseByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseByIdAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
    //   //  ------------------- Delete Book  ----------------
    //   .addCase(addCommentBookAction.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(addCommentBookAction.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.success = true;
    //   })
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
export default courseSlice.reducer;
