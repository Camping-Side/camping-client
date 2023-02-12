import { createSlice } from "@reduxjs/toolkit";
import { getDetail, getList } from "../actions/community";

const communityList = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  communityList: [],
  selectedCategory: "",
  selectedSort: "",
};
const communityDetail = {
  getDetailLoading: false,
  getDetailDone: false,
  getDetailError: null,
  communityDetail: {},
};

// 기본 state
export const initialState = {
  ...communityList,
  ...communityDetail,
};

// toolkit 사용방법
const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //커뮤니티 리스트
      .addCase(getList.pending, (state) => {
        state.getListDone = false;
        state.getListLoading = true;
        state.getListError = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.getListLoading = false;
        console.log("action.payload: ", action.payload);
        state.communityList = action.payload;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state: any, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      })
      //커뮤니티 상세
      .addCase(getDetail.pending, (state) => {
        state.getDetailDone = false;
        state.getDetailLoading = true;
        state.getDetailError = null;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.getDetailLoading = false;
        console.log("action.payload: ", action.payload);
        state.communityDetail = action.payload;
        state.getDetailDone = true;
      })
      .addCase(getDetail.rejected, (state: any, action) => {
        state.getDetailLoading = false;
        state.getDetailError = action.payload;
      }),
});

export default communitySlice;
