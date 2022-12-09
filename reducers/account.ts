import { createSlice } from "@reduxjs/toolkit";
import { checkPhoneDup } from "../actions/account";

// 기본 state
export const initialState = {
  checkPhoneDupLoading: false,
  checkPhoneDupDone: false,
  isPhoneDup: false,
  checkPhoneDupError: null,
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //휴대폰번호 중복체크
      .addCase(checkPhoneDup.pending, (state) => {
        state.checkPhoneDupDone = false;
        state.checkPhoneDupLoading = true;
        state.checkPhoneDupError = null;
      })
      .addCase(checkPhoneDup.fulfilled, (state, action) => {
        console.log("action:", action);
        state.checkPhoneDupLoading = false;
        state.isPhoneDup = action.payload.isDup;
        state.checkPhoneDupDone = true;
      })
      .addCase(checkPhoneDup.rejected, (state: any, action) => {
        state.checkPhoneDupLoading = false;
        state.checkPhoneDupError = action.payload;
      }),
});

export default accountSlice;
