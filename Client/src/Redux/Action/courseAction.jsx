import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const createCourseAction = createAsyncThunk(
  "courses/create",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/courses/create", courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCoursesAction = createAsyncThunk(
  "courses/get-all",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await Api.get("/courses/get-all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCourseByIdAction = createAsyncThunk(
  "courses/update/:id",
  async ({ _id, courseData }, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/courses/update/${_id}`, courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCourseByIdAction = createAsyncThunk(
  "courses/delete/:id",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/courses/delete/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
