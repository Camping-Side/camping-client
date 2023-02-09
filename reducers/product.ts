import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/product";
import { reqDto } from "../dto/common/reqDto";
// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  productList: [],
  productReqData: {
    ...reqDto,
  },
};

// toolkit 사용방법
const productSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetGetListDone(state) {
      state.getListDone = false;
    },
    setProductReqData(state, action) {
      state.productReqData = {
        ...state.productReqData,
        isList: action.payload.isList,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      //이메일 중복체크
      .addCase(getList.pending, (state) => {
        state.getListDone = false;
        state.getListLoading = true;
        state.getListError = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.getListLoading = false;
        console.log("action.payload: ", action.payload);
        state.productList = action.payload;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state: any, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      }),
});

export default productSlice;
