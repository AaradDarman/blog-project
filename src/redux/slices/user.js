import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Slice
const slice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserAction: (state, action) => action.payload,
    resetUser: (state, action) => {
      return {};
    },
  },
});
export default slice.reducer;
// Actions
const { setUserAction, resetUser } = slice.actions;

/**
 * @param {Object} user - user object
 */

export const setUser = (user) => async (dispatch) => {
  try {
    dispatch(setUserAction(user));
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const logout = () => async (dispatch) => {
  console.log("logout");
  try {
    dispatch(resetUser());
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};
