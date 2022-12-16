import { createSlice } from "@reduxjs/toolkit";
import {
  checkPhoneDup,
  checkEmailDup,
  resetPassword,
  findEmail,
} from "../actions/account";

// 기본 state
export const initialState = {
  checkPhoneDupLoading: false,
  checkPhoneDupDone: false,
  isPhoneDup: false,
  checkPhoneDupError: null,
  checkEmailDupLoading: false,
  checkEmailDupDone: false,
  isEmailDup: false,
  checkEmailDupError: null,
  resetPasswordLoading: false,
  resetPasswordDone: false,
  resetPasswordError: null,
  findEmailLoading: false,
  findEmailDone: false,
  findEmailError: null,
  findEmailResult: null,
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetDupChecked(state) {
      state.isPhoneDup = false;
      state.checkPhoneDupDone = false;
      state.isEmailDup = false;
      state.checkEmailDupDone = false;
    },
    resetResetPasswordDone(state) {
      state.resetPasswordDone = false;
    },
    findEmailDone(state) {
      state.findEmailDone = false;
    },
  },
  extraReducers: (builder) =>
    builder
      //이메일 중복체크
      .addCase(checkEmailDup.pending, (state) => {
        state.isEmailDup = false;
        state.checkEmailDupDone = false;
        state.checkEmailDupLoading = true;
        state.checkEmailDupError = null;
      })
      .addCase(checkEmailDup.fulfilled, (state, action) => {
        state.checkEmailDupLoading = false;
        state.isEmailDup = action.payload.isDup;
        state.checkEmailDupDone = true;
      })
      .addCase(checkEmailDup.rejected, (state: any, action) => {
        state.checkEmailDupLoading = false;
        state.checkEmailDupError = action.payload;
      })
      //휴대폰번호 중복체크
      .addCase(checkPhoneDup.pending, (state) => {
        state.isPhoneDup = false;
        state.checkPhoneDupDone = false;
        state.checkPhoneDupLoading = true;
        state.checkPhoneDupError = null;
      })
      .addCase(checkPhoneDup.fulfilled, (state, action) => {
        state.checkPhoneDupLoading = false;
        state.isPhoneDup = action.payload.isDup;
        state.checkPhoneDupDone = true;
      })
      .addCase(checkPhoneDup.rejected, (state: any, action) => {
        state.checkPhoneDupLoading = false;
        state.checkPhoneDupError = action.payload;
      })
      //비밀번호 재설정
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordDone = false;
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordDone = true;
      })
      .addCase(resetPassword.rejected, (state: any, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload;
      })
      //아이디(이메일) 찾기
      .addCase(findEmail.pending, (state) => {
        state.findEmailDone = false;
        state.findEmailLoading = true;
        state.findEmailError = null;
      })
      .addCase(findEmail.fulfilled, (state, action) => {
        state.findEmailLoading = false;
        state.findEmailDone = true;
        state.findEmailResult = action.payload.email;
      })
      .addCase(findEmail.rejected, (state: any, action) => {
        state.findEmailLoading = false;
        state.findEmailError = action.payload;
      }),
});

export default accountSlice;
