import { createSlice } from "@reduxjs/toolkit";
import {
  getDetail,
  getList,
  remove,
  removeComment,
  update,
} from "../actions/community";

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
  communityDetail: {
    id: 0,
    img: "",
    descImg: [],
    categoryName: "",
    categoryCode: "",
    title: "",
    desc: "",
    username: "",
    distance: 0,
    like: 0,
    comments: 0,
    userId: 0,
    created: "",
    location: "",
    commentList: [],
  },
  removeLoading: false,
  removeDone: false,
  removeError: null,
  updateLoading: false,
  updateDone: false,
  updateError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
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
    setCommunityDetail(state, action) {
      state.communityDetail = action.payload;
    },
    setCommunityDetailComment(state, action) {
      state.communityDetail = {
        ...state.communityDetail,
        commentList: action.payload,
      };
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
      })
      //커뮤니티 삭제
      .addCase(remove.pending, (state) => {
        state.removeDone = false;
        state.removeLoading = true;
        state.removeError = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.communityList = action.payload;
        state.removeDone = true;
      })
      .addCase(remove.rejected, (state: any, action) => {
        state.removeLoading = false;
        state.removeError = action.payload;
      })
      //커뮤니티 수정
      .addCase(update.pending, (state) => {
        state.updateDone = false;
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateDone = true;
      })
      .addCase(update.rejected, (state: any, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      //커뮤니티 댓글 삭제
      .addCase(removeComment.pending, (state) => {
        state.removeCommentDone = false;
        state.removeCommentLoading = true;
        state.removeCommentError = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.removeCommentLoading = false;
        state.communityDetail = action.payload;
        state.removeCommentDone = true;
      })
      .addCase(removeComment.rejected, (state: any, action) => {
        state.removeCommentLoading = false;
        state.removeCommentError = action.payload;
      }),
});

export default communitySlice;
