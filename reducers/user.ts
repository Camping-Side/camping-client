import { createSlice } from "@reduxjs/toolkit";
import { login, join } from "../actions/user";

// 기본 state
export const initialState = {
  loginInfo: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  joinLoading: false,
  joinDone: false,
  joinError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.loginDone = false;
      state.loginInfo = null;
    },
    joinDone(state) {
      state.joinDone = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // 로그인
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginInfo = action.payload.resultData;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // 회원가입
      .addCase(join.pending, (state) => {
        state.joinDone = false;
        state.joinLoading = true;
        state.joinError = null;
      })
      .addCase(join.fulfilled, (state, action) => {
        state.joinLoading = false;
        state.joinDone = true;
      })
      .addCase(join.rejected, (state: any, action) => {
        state.joinLoading = false;
        state.joinError = action.payload;
      }),
});

export default userSlice;
