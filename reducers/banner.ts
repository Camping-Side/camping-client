import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/banner";

// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  bannerList: [],
};

// toolkit 사용방법
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBannerList(state, action) {
      state.bannerList = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) =>
    builder
      //배너 리스트
      .addCase(getList.pending, (state) => {
        state.getListDone = false;
        state.getListLoading = true;
        state.getListError = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.getListLoading = false;
        state.bannerList = action.payload;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      }),
});

export default bannerSlice;
