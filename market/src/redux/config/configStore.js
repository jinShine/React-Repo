import { configureStore } from "@reduxjs/toolkit";
import post from "../modules/productSlice";
import user from "../modules/userSlice";
import file from "../modules/fileSlice";
import comment from "../modules/commentSlice";

const store = configureStore({
  reducer: { file, post, user, comment },
});

export default store;
