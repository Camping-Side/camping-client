import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  checkPhoneDup,
  checkEmailDup,
  resetPassword,
  findEmail,
  getInfo,
} from "../actions/account";
// 기본 state
export const initialState = {
  checkPhoneDupLoading: false,
  checkPhoneDupDone: false,
  checkPhoneDupError: null,
  checkPhoneDupSuccess: false,
  checkEmailDupLoading: false,
  checkEmailDupDone: false,
  checkEmailDupError: null,
  checkEmailDupSuccess: false,
  resetPasswordLoading: false,
  resetPasswordDone: false,
  resetPasswordError: null,
  findEmailLoading: false,
  findEmailDone: false,
  findEmailError: null,
  findEmailResult: null,
  getInfoLoading: false,
  getInfoDone: false,
  myInfo: null,
  getInfoError: null,
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetFlagState(state) {
      state.checkPhoneDupDone = false;
      state.checkPhoneDupSuccess = false;
      state.checkEmailDupDone = false;
      state.checkEmailDupSuccess = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) =>
    builder
      //이메일 중복체크
      .addCase(checkEmailDup.pending, (state) => {
        state.checkEmailDupDone = false;
        state.checkEmailDupLoading = true;
        state.checkEmailDupError = null;
      })
      .addCase(checkEmailDup.fulfilled, (state, action) => {
        state.checkEmailDupLoading = false;
        state.checkEmailDupDone = true;
        state.checkEmailDupSuccess = action.payload.isDup ? false : true;
      })
      .addCase(checkEmailDup.rejected, (state, action) => {
        state.checkEmailDupLoading = false;
        state.checkEmailDupError = action.payload;
      })
      //휴대폰번호 중복체크
      .addCase(checkPhoneDup.pending, (state) => {
        state.checkPhoneDupLoading = true;
        state.checkPhoneDupError = null;
        state.checkPhoneDupDone = false;
      })
      .addCase(checkPhoneDup.fulfilled, (state, action) => {
        state.checkPhoneDupLoading = false;
        state.checkPhoneDupDone = true;
        state.checkPhoneDupSuccess = action.payload.isDup ? false : true;
      })
      .addCase(checkPhoneDup.rejected, (state, action) => {
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
      .addCase(resetPassword.rejected, (state, action) => {
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
      .addCase(findEmail.rejected, (state, action) => {
        state.findEmailLoading = false;
        state.findEmailError = action.payload;
      })
      //내정보
      .addCase(getInfo.pending, (state) => {
        state.getInfoDone = false;
        state.getInfoLoading = true;
        state.getInfoError = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.getInfoLoading = false;
        state.getInfoDone = true;
        state.myInfo = action.payload.resultData;
        console.log("getInfo: ", action.payload.resultData);
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.getInfoLoading = false;
        state.getInfoError = action.payload;
      }),
});

export default accountSlice;
