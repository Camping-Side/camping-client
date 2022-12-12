import { createSlice } from "@reduxjs/toolkit";
import { getInfo } from "../actions/mypage";

// 기본 state
export const initialState = {
  getInfoLoading: false,
  getInfoDone: false,
  getInfoError: null,
};

// toolkit 사용방법
const mypageSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //내정보 가져오기
      .addCase(getInfo.pending, (state) => {
        state.getInfoDone = false;
        state.getInfoLoading = true;
        state.getInfoError = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.getInfoLoading = false;
        state.getInfoDone = true;
      })
      .addCase(getInfo.rejected, (state: any, action) => {
        state.getInfoLoading = false;
        state.getInfoError = action.payload;
      }),
});

export default mypageSlice;
