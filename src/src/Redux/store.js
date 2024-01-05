/* eslint-disable object-shorthand */
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slice/user";

const reducer = {
  userss:userSlice
};

export const store = configureStore({
  reducer: reducer,
  // devTools: true,
});
