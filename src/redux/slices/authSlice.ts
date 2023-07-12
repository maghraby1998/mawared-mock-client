import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: number;
  name?: string;
  email?: string;
  userType?: { name: string };
}

export interface InitialState {
  auth: User | null;
  token: string | null;
}

const initialState: InitialState = {
  auth: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<unknown>) => {
      state.auth = action.payload as User;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
