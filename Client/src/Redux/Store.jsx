import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import bookSlice from "./Slice/bookSlice";
import categorySlice from "./Slice/categorySlice";
import courseSlice from "./Slice/courseSlcie";
import questionSlice from "./Slice/questionSlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    book: bookSlice,
    category: categorySlice,
    course: courseSlice,
    question: questionSlice,
  },
});
export default Store;
