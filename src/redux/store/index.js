import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "../slices/user";
import posts from "../slices/posts";
const reducer = combineReducers({
  user,
  posts,
});

const store = configureStore({
  reducer,
  devTools: true,
});
export default store;
