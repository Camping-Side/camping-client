import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "product/getList",
  async (data, { rejectWithValue }) => {
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
