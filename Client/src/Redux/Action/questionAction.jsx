import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const askQuestionAction = createAsyncThunk(
  "questions/create",
  async (question, { rejectWithValue }) => {
    try {
      const response = await Api.post("/questions/create", { text: question });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addAnswerAction = createAsyncThunk(
  "questions/add-answer/:id",
  async ({ _id, reply }, { rejectWithValue }) => {
    try {
   
      const response = await Api.post(`/questions/add-answer/${_id}`, {
        text: reply,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const upVoteAnswerAction = createAsyncThunk(
  "questions/answer-vote/:questionId/:answerId",
  async ({ questionId, answerId }, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `/questions/answer-vote/${questionId}/${answerId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const upVoteQuestionAction = createAsyncThunk(
  "questions/question-vote/:questionId",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/questions/question-vote/${questionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const unRegisterUserAskQuestionAction = createAsyncThunk(
  "questions/unRegisterUserAskQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `/questions/unRegisterUserAskQuestion`,
        question
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchQuestionsAction = createAsyncThunk(
  "questions/get-all",
  async (question, { rejectWithValue }) => {
    try {
      const response = await Api.get("/questions/get-all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
