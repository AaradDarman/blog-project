import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../adapters/adapter";
import { toast } from "react-toastify";

export const getPost = createAsyncThunk("post/get", async (id) => {
  try {
    const res = await api.getPost(id);
    return res.data.post;
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
});

// Slice
const slice = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    entity: {},
  },
  reducers: {
    resetPost: (state, action) => {
      state.entity = {};
    },
  },
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPost.pending]: (state) => {
      state.status = "loading";
    },
  },
});
export default slice.reducer;
// Actions
const { resetPost } = slice.actions;

/**
 * @param {string} id - post id
 */

export const clearPost = () => async (dispatch) => {
  try {
    dispatch(resetPost());
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};
