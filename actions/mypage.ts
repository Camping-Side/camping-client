import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const getInfo = createAsyncThunk(
  "mypage/getInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(DOMAIN + "/api/v1/accounts/me");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
