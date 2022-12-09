import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(DOMAIN + "/api/v1/auth/login", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const join = createAsyncThunk(
  "auth/join",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(DOMAIN + "/api/v1/auth/sign", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
