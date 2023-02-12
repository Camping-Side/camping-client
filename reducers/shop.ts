import { createSlice } from "@reduxjs/toolkit";
import { getCategoryList } from "../actions/shop";

// 기본 state
export const initialState = {
  getCategoryListLoading: false,
  getCategoryListDone: false,
  getCategoryListError: null,
  categoryList: [],
};

// toolkit 사용방법
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //카테고리 리스트
      .addCase(getCategoryList.pending, (state) => {
        state.getCategoryListDone = false;
        state.getCategoryListLoading = true;
        state.getCategoryListError = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.getCategoryListLoading = false;
        state.categoryList = action.payload;
        state.getCategoryListDone = true;
      })
      .addCase(getCategoryList.rejected, (state: any, action) => {
        state.getCategoryListLoading = false;
        state.getCategoryListError = action.payload;
      }),
});

export default shopSlice;
