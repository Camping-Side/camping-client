import { createSlice } from "@reduxjs/toolkit";
import { getCategoryList, getList } from "../actions/product";
import { getDetail } from "../actions/product";

const productList = {
  getListLoading: false,
  getListDone: false,
  getListError: null,
  productList: [],
  getCategoryListLoading: false,
  getCategoryListDone: false,
  getCategoryListError: null,
  categoryList: [],
  selectedCategory: "",
  selectedSort: "",
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
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
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
      //상품 카테고리 리스트
      .addCase(getCategoryList.pending, (state) => {
        state.getCategoryListDone = false;
        state.getCategoryListLoading = true;
        state.getCategoryListError = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        const result = action.payload;
        state.getCategoryListLoading = false;
        state.categoryList = action.payload;
        state.selectedCategory = result[0];
        state.getCategoryListDone = true;
      })
      .addCase(getCategoryList.rejected, (state: any, action) => {
        state.getCategoryListLoading = false;
        state.getCategoryListError = action.payload;
      })
      //상품 상세
      .addCase(getDetail.pending, (state) => {
        state.getDetailDone = false;
        state.getDetailLoading = true;
        state.getDetailError = null;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        const result = action.payload;
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
