import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkEmailDup = createAsyncThunk(
  "account/checkEmailDup",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await api.post(
        BASE_URL + "/api/v1/accounts/checkEmailDup",
        { email: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkPhoneDup = createAsyncThunk(
  "account/checkPhoneDup",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await api.post(
        BASE_URL + "/api/v1/accounts/checkPhoneDup",
        { phone: data }
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
        BASE_URL + "/api/v1/accounts/resetPassword",
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
        BASE_URL + "/api/v1/accounts/findEmail",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInfo = createAsyncThunk(
  "account/getInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/admin/test");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
