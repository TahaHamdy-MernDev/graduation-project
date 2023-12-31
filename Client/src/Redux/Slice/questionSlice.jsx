import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { askQuestionAction, fetchQuestionsAction } from "../Action/questionAction";
const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: null,
    questions: [],
    getQuestion: null,
    loading: false,
    error: null,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Create Book ----------------
      .addCase(askQuestionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(askQuestionAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      //  ------------------- Get All Books  ----------------
      .addCase(fetchQuestionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.questions = payload.data;
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
export default questionSlice.reducer;