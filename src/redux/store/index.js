import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "../slices/user";
import posts from "../slices/posts";
import post from "../slices/post";
const reducer = combineReducers({
  user,
  posts,
  post,
});

const store = configureStore({
  reducer,
  devTools: true,
});
export default store;
