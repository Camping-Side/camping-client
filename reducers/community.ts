import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/community";
import { reqDto } from "../dto/common/reqDto";
// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  communityList: [],
};

// toolkit 사용방법
const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetGetListDone(state) {
      state.getListDone = false;
    },
  },
  extraReducers: (builder) =>
    builder
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
      }),
});

export default communitySlice;
