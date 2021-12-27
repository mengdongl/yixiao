import { AuthForm, bootstrapUser } from "./../context/auth-context";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/User";
import { appDispatch, rootState } from "store";
import * as auth from "auth-provider";

export interface State {
  user: User | null;
}
const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setUser } = authSlice.actions;

export const sleectUser = (state: rootState) => state.auth.user;

export const login = (data: AuthForm) => (dispatch: appDispatch) =>
  auth.login(data).then((res) => dispatch(setUser(res)));

export const register = (data: AuthForm) => (dispatch: appDispatch) =>
  auth.register(data).then((res) => dispatch(setUser(res)));

export const logout = () => (dispatch: appDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: appDispatch) =>
  bootstrapUser().then((res) => dispatch(setUser(res)));
