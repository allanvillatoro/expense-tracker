import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";
import { UserLoginForm, UserPost } from "../interfaces/UserPost";
import { usersApi } from "../api/usersApi";

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  errorsOnRegistering: string | undefined;
  errorsOnLogin: string | undefined;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  errorsOnRegistering: undefined,
  errorsOnLogin: undefined
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.errorsOnLogin = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.errorsOnLogin = "Error. Wrong email or password";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.errorsOnRegistering = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.errorsOnRegistering = "Error. It couldn't create the account";
      });
  },
});

export const { logout } = usersSlice.actions

export default usersSlice.reducer;

export const login = createAsyncThunk(
  "users/login",
  async (user: UserLoginForm) => {
    const response = await usersApi.login(user);
    return response.data;
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (user: UserPost) => {
    const response = await usersApi.register(user);
    return response.data;
  }
);
