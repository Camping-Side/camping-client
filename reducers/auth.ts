import { createSlice } from "@reduxjs/toolkit";
import { login, join, reissueToken } from "../actions/auth";

// 기본 state
export const initialState = {
  loginInfo: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  joinLoading: false,
  joinError: null,
  reissueTokenInfo: null,
  reissueTokenLoading: false,
  reissueTokenDone: false,
  reissueTokenError: null,
};

// toolkit 사용방법
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.loginDone = false;
      state.loginInfo = null;
      localStorage.removeItem("comporest_auth");
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
        if (localStorage.getItem("camporest_auth")) {
          localStorage.removeItem("camporest_auth");
        }

        localStorage.setItem(
          "camporest_auth",
          JSON.stringify(action.payload.resultData)
        );
        state.loginDone = true;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // 토큰재발급
      .addCase(reissueToken.pending, (state) => {
        state.reissueTokenLoading = true;
        state.reissueTokenDone = false;
        state.reissueTokenError = null;
      })
      .addCase(reissueToken.fulfilled, (state, action) => {
        state.reissueTokenLoading = false;
        state.reissueTokenInfo = action.payload.resultData;
        if (localStorage.getItem("camporest_auth")) {
          localStorage.removeItem("camporest_auth");
        }
        localStorage.setItem(
          "camporest_auth",
          JSON.stringify(action.payload.resultData)
        );
        state.reissueTokenDone = true;
      })
      .addCase(reissueToken.rejected, (state: any, action) => {
        state.reissueTokenLoading = false;
        state.reissueTokenError = action.payload;
      })
      // 회원가입
      .addCase(join.pending, (state) => {
        state.joinLoading = true;
        state.joinError = null;
      })
      .addCase(join.fulfilled, (state, action) => {
        state.joinLoading = false;
      })
      .addCase(join.rejected, (state: any, action) => {
        state.joinLoading = false;
        state.joinError = action.payload;
      }),
});

export default authSlice;
