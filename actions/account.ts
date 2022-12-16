import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const checkEmailDup = createAsyncThunk(
  "account/checkEmailDup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        DOMAIN + "/api/v1/accounts/checkEmailDup",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkPhoneDup = createAsyncThunk(
  "account/checkPhoneDup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        DOMAIN + "/api/v1/accounts/checkPhoneDup",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        DOMAIN + "/api/v1/accounts/resetPassword",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findEmail = createAsyncThunk(
  "auth/findEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        DOMAIN + "/api/v1/accounts/findEmail",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
