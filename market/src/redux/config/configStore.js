import { configureStore } from "@reduxjs/toolkit";
import post from "../modules/productSlice";
import user from "../modules/userSlice";

const store = configureStore({
  reducer: { post, user },
});

export default store;
