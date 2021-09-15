import { configureStore } from "@reduxjs/toolkit";
import { authSlice, State } from "./auth.slice";

export const store = configureStore<{auth:State}>({
  reducer: {
      auth: authSlice.reducer
  },
});

export type appDispatch = typeof store.dispatch
export type rootState = ReturnType<typeof store.getState>
