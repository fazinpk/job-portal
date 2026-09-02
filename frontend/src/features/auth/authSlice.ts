import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";
import {
  credentialsSetReducer,
  credentialsClearedReducer,
} from "./auth.reducers";

const initialState: AuthState = {
  accessToken: null,
  admin: null,
  status: "checking",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    credentialsSet: credentialsSetReducer,
    credentialsCleared: credentialsClearedReducer,
  },
});

export const { credentialsSet, credentialsCleared } = authSlice.actions;
export default authSlice.reducer;
