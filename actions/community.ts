import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "community/getList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/community", {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetail = createAsyncThunk(
  "community/getDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/community/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
