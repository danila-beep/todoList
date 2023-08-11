import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthDataType, auth, todoListAPI } from "../../api/todoistAPI";

const initialState = {
  isLoggedIn: false,
};

//reducer
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      console.log(state);

      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      return { ...state, isLoggedIn: false };
    },
  },
});

//thunk
export const loginTC = (data: AuthDataType) => async (dispatch: Dispatch) => {
  auth.login(data).then((res) => {
    console.log(res);
    dispatch(login({ isLoggedIn: true }));
  });
};
export const meTC = () => async (dispatch: Dispatch) => {
  auth.me().then((res) => {
    console.log(res);
    if (res.data.resultCode === 0) {
      dispatch(login({ isLoggedIn: true }));
    }
  });
};
export const logoutTC = () => async (dispatch: Dispatch) => {
  auth.logout().then((res) => {
    dispatch(logout());
  });
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
