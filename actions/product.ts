import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";
import { ProductReqData } from "../type/product/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "product/getList",
  async (data: ProductReqData, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/product", {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryList = createAsyncThunk(
  "product/getCategoryList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/product/category");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetail = createAsyncThunk(
  "product/getDetail",
  async (data: string | string[] | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/product/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
