import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const createCategoryAction = createAsyncThunk(
    "categories/create",
    async (categoryData, { rejectWithValue }) => {
      try {
        const response = await Api.post("/category/create", categoryData );
       
        return response.data;
      } catch (error) {
        
        return rejectWithValue(error.response.data);
      }
    }
  );
export const getAllCategoriesAction = createAsyncThunk(
    "categories/get-all",
    async (categoryData, { rejectWithValue }) => {
      try {
        const response = await Api.get("/category/get-all" );
        return response.data;
      } catch (error) {
       
        return rejectWithValue(error.response.data);
      }
    }
  );