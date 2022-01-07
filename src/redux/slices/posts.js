import { createSlice } from "@reduxjs/toolkit";
import api from "../../adapters/admin-adapter";
import { toast } from "react-toastify";

// Slice
const slice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    createPost: (state, action) => {
      state.unshift(action.payload);
    },
    setPosts: (state, action) => action.payload,
  },
});
export default slice.reducer;
// Actions
const { createPost, setPosts } = slice.actions;

/**
 * @param {Object} post
 * @param {function} onSuccess - callBack for success
 */

export const createNewPost = (formData) => async (dispatch) => {
  try {
    const { status, data } = await api.createPost(formData);
    if (status === 201) {
      toast.success("ذخیره شد", {
        position: "bottom-center",
        closeOnClick: true,
      });
      dispatch(createPost(data.post));
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const { status, data } = await api.getPosts();
    if (status === 200) {
      dispatch(setPosts(data.posts));
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const getPostsByAuthor = (authorId) => async (dispatch) => {
  try {
    const { status, data } = await api.getPostsByAuthor(authorId);
    if (status === 200) {
      dispatch(setPosts(data.posts));
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};
