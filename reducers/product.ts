import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getList } from "../actions/product";
import { getDetail } from "../actions/product";

const productList = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  productList: [],
};
const productDetail = {
  getDetailLoading: false,
  getDetailDone: false,
  getDetailError: null,
  productDetail: {},
  selectedImg: "",
  imgList: [],
};

// 기본 state
export const initialState = {
  ...productList,
  ...productDetail,
};

// toolkit 사용방법
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedImg(state, action) {
      state.selectedImg = action.payload;
    },
    setImgList(state, action) {
      state.imgList = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //상품 리스트
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
      })
      //상품 상세
      .addCase(getDetail.pending, (state) => {
        state.getDetailDone = false;
        state.getDetailLoading = true;
        state.getDetailError = null;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        const result = action.payload;
        console.log("result: ", result);
        state.getDetailLoading = false;
        state.productDetail = result;
        state.selectedImg = result.detailImg[0];
        state.imgList = result.detailImg.map((img: string, index: number) => {
          return {
            url: img,
            isSelected: index === 0 ? true : false,
          };
        });
        state.getDetailDone = true;
      })
      .addCase(getDetail.rejected, (state: any, action) => {
        state.getDetailLoading = false;
        state.getDetailError = action.payload;
      }),
});

export default productSlice;
